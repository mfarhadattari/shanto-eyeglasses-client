import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EyeFileInput from "../../components/form/EyeFileInput";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import EyeSelect from "../../components/form/EyeSelect";
import BackButton from "../../components/ui/BackButton";
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from "../../const/eyeglass.const";
import usePageTitle from "../../hooks/usePageTitle";
import { useAddEyeglassMutation } from "../../redux/features/Eyeglasses/eyeglassApi";

const AddEyeglass = () => {
  const title = usePageTitle("Add Eyeglass");
  const methods = useForm();

  // loading handling
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [fileReset, setFileReset] = useState(false);
  const navigate = useNavigate();

  const [addEyeglass] = useAddEyeglassMutation();

  /* ---------------- Eyeglass Submit Handler -------------- */
  const onAddEyeglassFormSubmit = async (values: FieldValues) => {
    if (!file) {
      return toast.error("No image selected");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      const data: Record<string, any> = values;
      Object.entries(data).forEach(([key, value]) => {
        if (key === "price" || key === "quantity") {
          data[key] = Number(value);
        }
      });

      const strData = JSON.stringify(data);
      formData.append("file", file);
      formData.append("data", strData);
      const res = await addEyeglass(formData).unwrap();
      setLoading(false);
      setFileReset(true);
      methods.reset();
      toast.success(`${res.message}!`);
      navigate(`/eyeglasses/${res.data._id}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };
  /* ---------------- Handel File Change -------------- */
  const handelFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selected = files[0] as any;
      setFile(selected);
    }
  };

  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {title}
      <EyeForm
        style={{ width: "75%", margin: "0 auto" }}
        methods={methods}
        onSubmit={onAddEyeglassFormSubmit}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "20px",
          }}
        >
          <BackButton title="Back to eyeglasses page" to="/eyeglasses" />
        </div>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "20px",
          }}
        >
          Add Eyeglass
        </h3>

        <EyeInput
          name="name"
          placeholder="Name"
          type="text"
          requiredMessage="Please enter eyeglass name!"
          label="Name"
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeInput
            name="price"
            placeholder="Price"
            type="number"
            requiredMessage="Please enter eyeglass price!"
            label="Price"
          />
          <EyeInput
            name="quantity"
            placeholder="Quantity"
            type="number"
            requiredMessage="Please enter eyeglass quantity!"
            label="Quantity"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeInput
            label="Brand"
            name="brand"
            placeholder="Brand"
            type="text"
            requiredMessage="Please enter eyeglass brand!"
          />
          <EyeInput
            label="Color"
            name="color"
            placeholder="Color"
            type="text"
            requiredMessage="Please enter eyeglass color!"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeSelect
            name="frameMaterial"
            placeholder="Frame material"
            options={FRAMEMATERIALS}
            requiredMessage="Please select frame material!"
            label="Frame Material"
          />
          <EyeSelect
            name="frameShape"
            placeholder="Frame shape"
            options={FRAMESHAPES}
            requiredMessage="Please select frame shape!"
            label="Frame Shape"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeSelect
            name="lensType"
            placeholder="Lens type"
            options={LENSTYPES}
            requiredMessage="Please select lens type!"
            label="Lens Type"
          />
          <EyeSelect
            name="gender"
            placeholder="Gender"
            options={GENDERS}
            requiredMessage="Please select gender!"
            label="Gender"
          />
        </div>
        <EyeFileInput
          name="file"
          placeholder="Image"
          requiredMessage="Please select image!"
          label="Image"
          onChange={handelFileChange}
          isReset={fileReset}
          acceptType="image/*"
        />

        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          Add Eyeglass
        </Button>
      </EyeForm>
    </main>
  );
};

export default AddEyeglass;
