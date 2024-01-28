import { Avatar, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const MainLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              gap: "10px",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <Avatar
              size={50}
              src={user?.avatar || "/public/icon.png"}
              style={{ border: "2px solid white", marginRight: "20px" }}
            />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
