import {
  EyeOutlined,
  HomeOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/features/Auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const { Sider } = Layout;

interface IMenuItem {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  children?: IMenuItem[];
}

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const items: ItemType<IMenuItem>[] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "eyeglasses",
      label: "Eyeglasses Management",
      icon: <EyeOutlined />,
      children: [
        { key: "/eyeglasses", label: <Link to="/eyeglasses">Eyeglasses</Link> },
        {
          key: "/eyeglasses/add",
          label: <Link to="/eyeglasses/add">Add Eyeglass</Link>,
        },
      ],
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
    {
      key: "/logout",
      label: (
        <Button
          style={{ width: "100%" }}
          onClick={() => dispatch(logout())}
          type="dashed"
          danger
        >
          <LogoutOutlined /> Logout
        </Button>
      ),
    },
  ];

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
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
    </Sider>
  );
};

export default Sidebar;
