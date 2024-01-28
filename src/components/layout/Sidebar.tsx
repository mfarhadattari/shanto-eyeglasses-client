import {
  EyeOutlined,
  HomeOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/features/Auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/eyeglasses",
    icon: <EyeOutlined />,
    label: <Link to="/eyeglasses">Eyeglasses</Link>,
  },
  {
    key: "/sales",
    icon: <StockOutlined />,
    label: <Link to="/sales">Sales</Link>,
  },
  {
    key: "/my-profile",
    icon: <UserOutlined />,
    label: <Link to="/my-profile">Profile</Link>,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <Sider style={{ position: "relative" }} breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <img
          src="/icon.png"
          alt="Eyeglasses Management"
          style={{ height: "50px", width: "50px" }}
        />
        <h3
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          Eyeglasses Management
        </h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[useLocation().pathname]}
        items={items}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <Button onClick={() => dispatch(logout())} type="primary" danger>
          <LogoutOutlined /> Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
