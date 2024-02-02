import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";

const BackButton = ({ to, title }: { to: string; title: string }) => {
  return (
    <Tooltip title={title} color="blue">
      <Link to={to}>
        <Button size="large" htmlType="button" type="primary">
          <DoubleLeftOutlined />
        </Button>
      </Link>
    </Tooltip>
  );
};

export default BackButton;
