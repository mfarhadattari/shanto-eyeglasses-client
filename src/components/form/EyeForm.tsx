import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TEyeForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
  style?: object;
};

const EyeForm = ({ children, onSubmit, style, className }: TEyeForm) => {
  const methods = useForm();

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
