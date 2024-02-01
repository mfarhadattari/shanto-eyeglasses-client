import { Button, Skeleton } from "antd";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EyeFileInput from "../../components/form/EyeFileInput";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import EyeSelect from "../../components/form/EyeSelect";
import ErrorUI from "../../components/ui/ErrorUI";
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from "../../const/eyeglass.const";
import usePageTitle from "../../hooks/usePageTitle";
import {
  useAddEyeglassMutation,
  useGetEyeglassDetailsQuery,
} from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const CreateEyeglassVariant = () => {
  const title = usePageTitle("Create Eyeglass Variant");
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetEyeglassDetailsQuery(id);
  const eyeglass: TEyeglass = data?.data;

  const methods = useForm();

  // loading handling
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [fileReset, setFileReset] = useState(false);
  const navigate = useNavigate();

  const [addEyeglass] = useAddEyeglassMutation();

  /* ---------------- Create Eyeglass Variant Submit Handler -------------- */
  const onCreateEyeglassVariantFormSubmit = async (values: FieldValues) => {
    if (!file) {
      return toast.error("No image selected");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      let data: Record<string, any> = {
        ...eyeglass,
        _id: undefined,
        image: undefined,
      };

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          if (key === "price" || key === "quantity") {
            value = Number(value);
          }
          data = {
            ...data,
            [key]: value,
          };
        }
      });
      const strData = JSON.stringify(data);
      formData.append("file", file);
      formData.append("data", strData);
      const res = await addEyeglass(formData).unwrap();
      setLoading(false);
      methods.reset();
      setFileReset(true);
      toast.success(`Eyeglass variant create successfully!`);
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
    <>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : id && isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
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
            onSubmit={onCreateEyeglassVariantFormSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "20px",
              }}
            >
              <Link to="/eyeglasses">
                <Button type="primary">Back to eyeglasses page</Button>
              </Link>
            </div>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Create Variant
            </h3>

            <EyeInput
              name="name"
              placeholder="Name"
              type="text"
              label="Name"
              defaultValue={eyeglass?.name}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeInput
                name="price"
                placeholder="Price"
                type="number"
                label="Price"
                defaultValue={eyeglass?.price}
              />
              <EyeInput
                name="quantity"
                placeholder="Quantity"
                type="number"
                label="Quantity"
                defaultValue={eyeglass?.quantity}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeInput
                label="Brand"
                name="brand"
                placeholder="Brand"
                type="text"
                defaultValue={eyeglass?.brand}
              />
              <EyeInput
                label="Color"
                name="color"
                placeholder="Color"
                type="text"
                defaultValue={eyeglass?.color}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeSelect
                name="frameMaterial"
                placeholder="Frame material"
                options={FRAMEMATERIALS}
                label="Frame Material"
                defaultValue={eyeglass?.frameMaterial}
              />
              <EyeSelect
                name="frameShape"
                placeholder="Frame shape"
                options={FRAMESHAPES}
                label="Frame Shape"
                defaultValue={eyeglass?.frameShape}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeSelect
                name="lensType"
                placeholder="Lens type"
                options={LENSTYPES}
                label="Lens Type"
                defaultValue={eyeglass?.lensType}
              />
              <EyeSelect
                name="gender"
                placeholder="Gender"
                options={GENDERS}
                label="Gender"
                defaultValue={eyeglass?.gender}
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
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Create Variant{" "}
            </Button>
          </EyeForm>
        </main>
      )}
    </>
  );
};

export default CreateEyeglassVariant;
