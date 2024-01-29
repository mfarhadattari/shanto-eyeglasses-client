import { Input } from "antd";
import { ChangeEventHandler, ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TEyeFileInput = {
  name: string;
  placeholder: string;
  label?: string;
  prefix?: ReactNode;
  requiredMessage?: string;
  style?: object;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isReset?: boolean;
};

const EyeFileInput = ({
  placeholder,
  name,
  label,
  prefix,
  requiredMessage,
  className,
  style,
  isReset,
  onChange,
}: TEyeFileInput) => {
  const { control, reset } = useFormContext();

  const handleReset = () => {
    reset({
      [name]: null,
    });
  };

  useEffect(() => {
    if (isReset) {
      handleReset();
    }
  }, [isReset]);

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
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            style={{ width: "100", ...style }}
            className={className}
            placeholder={placeholder}
            id={name}
            name={name}
            type="file"
            onChange={onChange}
            prefix={prefix}
          />
        )}
      />
    </div>
  );
};

export default EyeFileInput;
