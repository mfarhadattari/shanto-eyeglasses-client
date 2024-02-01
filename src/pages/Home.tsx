import { SafetyOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import ErrorUI from "../components/ui/ErrorUI";
import SaleHistoryChart from "../components/ui/SaleHistoryChart";
import usePageTitle from "../hooks/usePageTitle";
import { useGetDashboardQuery } from "../redux/features/dashboard/dashboardApi";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, isError, error } = useGetDashboardQuery(undefined);
  const dashboard = data?.data;
  const title = usePageTitle("Home");

  return (
    <div style={{ padding: "20px" }}>
      {title}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h1>
          Hey, {user?.name} <SafetyOutlined style={{ color: "green" }} />
        </h1>
      </div>
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={7}>
              <Card>
                <Statistic title="Item Sold" value={dashboard?.totalSales} />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={7}>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={dashboard?.totalRevenue}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={7}>
              <Card>
                <Statistic
                  title="Eyeglass"
                  value={dashboard?.totalEyeglasses}
                />
              </Card>
            </Col>
          </Row>

          {dashboard?.sales && (
            <>
              <Title
                level={3}
                title="Sale history"
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                }}
              >
                Sale History
              </Title>
              <SaleHistoryChart sales={dashboard?.sales} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
