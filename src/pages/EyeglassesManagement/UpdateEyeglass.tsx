import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import EyeSelect from "../../components/form/EyeSelect";
import EyeTextArea from "../../components/form/EyeTextArea";
import BackButton from "../../components/ui/BackButton";
import ErrorUI from "../../components/ui/ErrorUI";
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from "../../const/eyeglass.const";
import usePageTitle from "../../hooks/usePageTitle";
import {
  useGetEyeglassDetailsQuery,
  useUpdateEyeglassMutation,
} from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";
import {
  convertOtherAttributesIntoString,
  formatOtherRelevantAttributes,
} from "../../utils";

const UpdateEyeglass = () => {
  const title = usePageTitle("Update Eyeglass");
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetEyeglassDetailsQuery(id);
  const eyeglass: TEyeglass = data?.data;

  const methods = useForm();
  // loading handling
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [updateEyeglass] = useUpdateEyeglassMutation();

  /* ---------------- Eyeglass Submit Handler -------------- */
  const onUpdateEyeglassFormSubmit = async (values: FieldValues) => {
    if (values.otherRelevantAttributes) {
      const otherRelevantAttributes = formatOtherRelevantAttributes(
        values.otherRelevantAttributes
      );
      if (!otherRelevantAttributes) {
        return toast.error("Invalid attributes: key1 : value1, key1 : value2");
      }
      values.otherRelevantAttributes = otherRelevantAttributes;
    }
    setLoading(true);
    try {
      let data: Record<string, any> | null = null;
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          if (key === "price" || key === "quantity") {
            value = Number(value);
          }
          data = {
            [key]: value,
            ...data,
          };
        }
      });
      if (!data) {
        setLoading(false);
        return toast.warning("Eyeglass information is not changed!");
      }
      const res = await updateEyeglass({ id: id as string, data }).unwrap();
      toast.success(`${res.message}!`);
      setLoading(false);
      navigate(`/eyeglasses/${res.data._id}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  return (
    <>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
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
            onSubmit={onUpdateEyeglassFormSubmit}
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
              Update Eyeglass
            </h3>

            <EyeInput
              name="name"
              placeholder="Name"
              type="text"
              defaultValue={eyeglass?.name}
              label="Name"
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeInput
                name="price"
                placeholder="Price"
                type="number"
                defaultValue={eyeglass?.price}
                label="Price"
              />
              <EyeInput
                name="quantity"
                placeholder="Quantity"
                type="number"
                defaultValue={eyeglass?.quantity}
                label="Quantity"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeInput
                name="brand"
                placeholder="Brand"
                type="text"
                defaultValue={eyeglass?.brand}
                label="Brand"
              />
              <EyeInput
                name="color"
                placeholder="Color"
                type="text"
                defaultValue={eyeglass?.color}
                label="Color"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeSelect
                name="frameMaterial"
                placeholder="Frame material"
                options={FRAMEMATERIALS}
                defaultValue={eyeglass?.frameMaterial}
                label="Frame Material"
              />
              <EyeSelect
                name="frameShape"
                placeholder="Frame shape"
                options={FRAMESHAPES}
                defaultValue={eyeglass?.frameShape}
                label="Frame Shape"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <EyeSelect
                name="lensType"
                placeholder="Lens type"
                options={LENSTYPES}
                defaultValue={eyeglass?.lensType}
                label="Lens Type"
              />
              <EyeSelect
                name="gender"
                placeholder="Gender"
                options={GENDERS}
                defaultValue={eyeglass?.gender}
                label="Gender"
              />
            </div>
            <EyeTextArea
              label="Other Relevant Attributes"
              name="otherRelevantAttributes"
              placeholder="Write attributes like:
           key1 : value1, key1 : value2"
              defaultValue={
                eyeglass?.otherRelevantAttributes
                  ? convertOtherAttributesIntoString(
                      eyeglass.otherRelevantAttributes
                    )
                  : undefined
              }
            />

            <Button
              icon={<CheckCircleOutlined />}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Update Eyeglass
            </Button>
          </EyeForm>
        </main>
      )}
    </>
  );
};

export default UpdateEyeglass;
