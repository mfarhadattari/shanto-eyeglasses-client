import { Result } from "antd";

const ErrorUI = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Result
      status="error"
      title="Oops! Something went wrong."
      subTitle={errorMessage}
    />
  );
};

export default ErrorUI;
