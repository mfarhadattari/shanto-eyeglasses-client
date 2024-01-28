import { Button, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import EyeSelect from "../../components/form/EyeSelect";
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from "../../const/eyeglass.const";
import { useAddEyeglassMutation } from "../../redux/features/Eyeglasses/eyeglassApi";

const AddEyeglass = () => {
  const methods = useForm();
  // loading handling
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const [addEyeglass] = useAddEyeglassMutation();

  /* ---------------- Eyeglass Submit Handler -------------- */
  const onAddEyeglassFormSubmit = async (values: FieldValues) => {
    if (!file) {
      return toast.error("No image selected");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      let data: any = values;
      Object.entries(values).forEach(([key, value]) => {
        if (key === "price" || key === "quantity") {
          data[key] = Number(value);
        }
      });
      data = JSON.stringify(values);
      formData.append("file", file);
      formData.append("data", data);
      const res = await addEyeglass(formData).unwrap();
      methods.reset();
      toast.success(`${res.message}!`);
      setLoading(false);
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
      <EyeForm
        style={{ width: "75%", margin: "0 auto" }}
        methods={methods}
        onSubmit={onAddEyeglassFormSubmit}
      >
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
            placeholder="Select frame material"
            options={FRAMEMATERIALS}
            requiredMessage="Please select frame material!"
            label="Frame Material"
          />
          <EyeSelect
            name="frameShape"
            placeholder="Select frame shape"
            options={FRAMESHAPES}
            requiredMessage="Please select frame shape!"
            label="Frame Shape"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeSelect
            name="lensType"
            placeholder="Select lens type"
            options={LENSTYPES}
            requiredMessage="Please select lens type!"
            label="Lens Type"
          />
          <EyeSelect
            name="gender"
            placeholder="Select gender"
            options={GENDERS}
            requiredMessage="Please select gender!"
            label="Gender"
          />
        </div>
        <div>
          <label style={{ fontSize: "14px", fontWeight: 500 }} htmlFor="file">
            <span style={{ color: "red" }}>*</span> Image
          </label>
          <Input
            name="file"
            type="file"
            style={{
              marginBottom: "15px",
            }}
            onChange={handelFileChange}
          />
        </div>

        <Button
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
