import { HomeFilled } from "@ant-design/icons";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  const title = usePageTitle("Error");
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {title}
      <Result
        status="404"
        title="Page is not found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button icon={<HomeFilled />} type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
