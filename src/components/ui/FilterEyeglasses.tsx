import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import queryString from "query-string";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from "../../const/eyeglass.const";
import { useFilterEyeglassMutation } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";
import EyeForm from "../form/EyeForm";
import EyeInput from "../form/EyeInput";
import EyeSelect from "../form/EyeSelect";

interface IFilterEyeglasses {
  setEyeglasses: Dispatch<SetStateAction<TEyeglass[]>>;
  setIsEyeglassFilter: Dispatch<SetStateAction<boolean>>;
  preData: TEyeglass[];
}

const FilterEyeglasses = ({
  setEyeglasses,
  setIsEyeglassFilter,
  preData,
}: IFilterEyeglasses) => {
  const methods = useForm();

  const [filterEyeglasses] = useFilterEyeglassMutation();

  const [loading, setLoading] = useState(false);

  /* -------------- Filter Submit Handler -------------- */
  const onFilterSubmit = async (values: FieldValues) => {
    setLoading(true);
    try {
      let data: Record<string, any> | null = null;
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          data = {
            [key]: value,
            ...data,
          };
        }
      });
      if (!data) {
        setLoading(false);
        setEyeglasses(preData);
        return toast.warning("Eyeglass filter failed!");
      }
      const searchStr = queryString.stringify(data);
      const res = await filterEyeglasses(searchStr).unwrap();
      setEyeglasses(res?.data);
      toast.success(`${res.message}!`);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  /* -------------------->> Clear Filter Handler <<----------- */
  const handelClearFilter = () => {
    setEyeglasses(preData);
    setIsEyeglassFilter(false);
  };

  return (
    <div>
      <EyeForm
        methods={methods}
        style={{
          margin: "0 auto",
        }}
        onSubmit={onFilterSubmit}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          Filter Eyeglass
        </h3>
        <EyeSelect
          name="price"
          placeholder="Price Range"
          options={["50-100", "100-500", "100-1000", "500-1000", "null"]}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeInput name="brand" placeholder="Brand" type="text" />
          <EyeInput name="color" placeholder="Color" type="text" />
          <EyeSelect
            name="frameMaterial"
            placeholder="Frame material"
            options={FRAMEMATERIALS}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeSelect
            name="frameShape"
            placeholder="Frame shape"
            options={FRAMESHAPES}
          />
          <EyeSelect
            name="lensType"
            placeholder="Lens type"
            options={LENSTYPES}
          />
          <EyeSelect name="gender" placeholder="Gender" options={GENDERS} />
        </div>
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            ghost
            htmlType="button"
            style={{ width: "100%" }}
            onClick={handelClearFilter}
            icon={<CloseCircleFilled />}
          >
            Clear Filter
          </Button>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            icon={<SearchOutlined />}
          >
            Filter
          </Button>
        </div>
      </EyeForm>
    </div>
  );
};

export default FilterEyeglasses;
