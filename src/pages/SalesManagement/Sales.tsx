import {
  ClockCircleOutlined,
  EyeFilled,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Skeleton, Table } from "antd";
import { Link } from "react-router-dom";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetSalesQuery } from "../../redux/features/Sales/saleApi";
import { calculateSalePrice, formatDate } from "../../utils";

const Sales = () => {
  const { data, isLoading, isError, error } = useGetSalesQuery(undefined);
  const sales: any = data?.data || [];

  // table columns setup
  const columns = [
    {
      title: "Buyername",
      dataIndex: "buyerName",
      key: "name",
      render: (title: string) => (
        <div
          style={{
            width: "100%",
          }}
        >
          <h3>{title}</h3>{" "}
        </div>
      ),
    },
    {
      title: "Price & Quantity",
      dataIndex: "price&Quantity",
      key: "details",
      render: (text: string, record: any) => (
        <div
          style={{
            width: "100%",
            fontWeight: 500,
          }}
        >
          <p>Quantity: {record.quantity}</p>
          <p>
            Price: $
            {calculateSalePrice(record?.quantity, record?.product?.quantity)}
          </p>
        </div>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text: string, record: any) => (
        <div
          style={{
            width: "100%",
            fontWeight: 500,
          }}
        >
          <p>
            <UserOutlined /> {record?.seller?.name}
          </p>
          <p>
            <ClockCircleOutlined /> {formatDate(record.saleAt)}
          </p>
        </div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* ----------- Sale Details Button ------------- */}
          <Link style={{ width: "100%" }} to={`/sales/${record._id}`}>
            <Button
              icon={<InfoCircleFilled />}
              type="primary"
              style={{ background: "green", width: "100%" }}
            >
              Details
            </Button>
          </Link>
          {/* ----------- Product Details Button ------------- */}
          <Link
            style={{ width: "100%" }}
            to={`/eyeglasses/${record?.product?._id}`}
          >
            <Button
              icon={<EyeFilled />}
              type="primary"
              style={{ width: "100%" }}
            >
              Eyeglass
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <main>
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <Table
          columns={columns}
          dataSource={sales.map((e: any) => ({ key: e._id, ...e }))}
        />
      )}
    </main>
  );
};

export default Sales;
