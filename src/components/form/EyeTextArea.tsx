import TextArea from "antd/es/input/TextArea";

import Alert from "antd/es/alert/Alert";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TEyeTextArea = {
  name: string;
  placeholder: string;
  label?: string;
  requiredMessage?: string;
  style?: object;
  className?: string;
  defaultValue?: any;
  rows?: number;
};

const EyeTextArea = ({
  placeholder,
  name,
  label,
  requiredMessage,
  defaultValue,
  className,
  style,
  rows = 4,
}: TEyeTextArea) => {
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
          <TextArea
            {...field}
            style={{ width: "100", ...style }}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue}
            id={name}
            allowClear
            rows={rows}
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

export default EyeTextArea;
