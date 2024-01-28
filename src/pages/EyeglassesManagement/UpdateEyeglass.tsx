import { Button, Skeleton } from "antd";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
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
import {
  useGetEyeglassDetailsQuery,
  useUpdateEyeglassMutation,
} from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const UpdateEyeglass = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetEyeglassDetailsQuery(id);
  const eyeglass: TEyeglass = data?.data;

  const methods = useForm();
  // loading handling
  const [loading, setLoading] = useState(false);

  const [updateEyeglass] = useUpdateEyeglassMutation();

  /* ---------------- Eyeglass Submit Handler -------------- */
  const onUpdateEyeglassFormSubmit = async (values: FieldValues) => {
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
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  return isLoading ? (
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
            placeholder="Select frame material"
            options={FRAMEMATERIALS}
            defaultValue={eyeglass?.frameMaterial}
            label="Frame Material"
          />
          <EyeSelect
            name="frameShape"
            placeholder="Select frame shape"
            options={FRAMESHAPES}
            defaultValue={eyeglass?.frameShape}
            label="Frame Shape"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeSelect
            name="lensType"
            placeholder="Select lens type"
            options={LENSTYPES}
            defaultValue={eyeglass?.lensType}
            label="Lens Type"
          />
          <EyeSelect
            name="gender"
            placeholder="Select gender"
            options={GENDERS}
            defaultValue={eyeglass?.gender}
            label="Gender"
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          Update Eyeglass
        </Button>
      </EyeForm>
    </main>
  );
};

export default UpdateEyeglass;
