import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
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
      <Result
        status="404"
        title="Page is not found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
