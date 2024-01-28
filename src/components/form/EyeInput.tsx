import { Input } from "antd";
import Alert from "antd/es/alert/Alert";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TEyeInput = {
  name: string;
  placeholder: string;
  type: string;
  label?: string;
  prefix?: ReactNode;
  requiredMessage?: string;
  style?: object;
  className?: string;
};

const EyeInput = ({
  placeholder,
  name,
  label,
  type,
  prefix,
  requiredMessage,
  className,
  style,
}: TEyeInput) => {
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
          <Input
            {...field}
            type={type}
            style={{ width: "100", ...style }}
            placeholder={placeholder}
            id={name}
            prefix={prefix}
            className={className}
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

export default EyeInput;
