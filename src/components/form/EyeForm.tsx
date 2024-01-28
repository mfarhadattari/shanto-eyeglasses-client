import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, string>;
};

type TEyeForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
  style?: object;
  defaultValues?: Record<string, string>;
};

const EyeForm = ({
  children,
  onSubmit,
  style,
  className,
  defaultValues,
}: TEyeForm) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form
        style={style}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default EyeForm;
