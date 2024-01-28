import { Alert, Select } from "antd";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { capitalizeString } from "../../utils";

interface IEyeSelect {
  options: string[];
  name: string;
  placeholder: string;
  label?: string;
  requiredMessage?: string;
  style?: object;
  className?: string;
  defaultValue?: string;
}

const EyeSelect = ({
  options,
  placeholder,
  name,
  label,
  requiredMessage,
  className,
  style,
  defaultValue,
}: IEyeSelect) => {
  const {
    formState: { errors },
  } = useFormContext();

  const rules = {
    required: "",
  };

  if (requiredMessage) {
    rules["required"] = requiredMessage;
  }

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "15px",
        fontWeight: 500,
      }}
    >
      {label && (
        <label style={{ fontSize: "14px" }} htmlFor={name}>
          {requiredMessage && <span style={{ color: "red" }}>*</span>} {label}
        </label>
      )}
      <Controller
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            showSearch
            style={{ width: "100%", ...style }}
            placeholder={placeholder}
            className={className}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            defaultValue={defaultValue}
            options={options?.map((value: string) => ({
              value: value,
              label: capitalizeString(value),
            }))}
          />
        )}
      />
      {errors[name]?.message && (
        <Alert
          style={{ color: "red", marginTop: "10px", fontSize: "12px" }}
          message={errors[name]?.message as ReactNode}
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default EyeSelect;
