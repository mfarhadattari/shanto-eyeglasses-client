import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler } from "react-hook-form";

type TEyeForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  methods: any;
  className?: string;
  style?: object;
};

const EyeForm = ({
  children,
  onSubmit,
  methods,
  style,
  className,
}: TEyeForm) => {
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
