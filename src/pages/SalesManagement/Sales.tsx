import {
  ClockCircleOutlined,
  EyeFilled,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Breakpoint, Button, Select, Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ErrorUI from "../../components/ui/ErrorUI";
import usePageTitle from "../../hooks/usePageTitle";
import {
  useFilterSalesMutation,
  useGetSalesQuery,
} from "../../redux/features/Sales/saleApi";
import { TSale } from "../../types/sale.type";
import { calculateSalePrice, formatDate } from "../../utils";

const Sales = () => {
  const title = usePageTitle("Sales");
  const [sales, setSales] = useState<TSale[]>([]);
  const { data, isLoading, isError, error } = useGetSalesQuery(undefined);

  useEffect(() => {
    setSales(data?.data || []);
  }, [data]);

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
      render: (_text: string, record: TSale) => (
        <div
          style={{
            width: "100%",
            fontWeight: 500,
          }}
        >
          <p>Quantity: {record.quantity}</p>
          <p>
            Price: ${calculateSalePrice(record?.quantity, record?.productPrice)}
          </p>
        </div>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (_text: string, record: TSale) => (
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
      responsive: ["md"] as Breakpoint[],
    },

    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: TSale) => (
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
            state={{ from: "/sales" }}
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

  // handling sale filtering
  const [filterSales] = useFilterSalesMutation();
  const [onFilterLoading, setOnFilterLoading] = useState(false);
  const handelSaleFilter = async (value: string) => {
    if (!value || value === "no-filter") {
      return setSales(data?.data);
    }
    setOnFilterLoading(true);
    try {
      const res = await filterSales(value).unwrap();
      if (res.data.length <= 0) {
        return toast.error("No data found!");
      }
      setSales(res.data);
      setOnFilterLoading(false);
      toast.success("Filtered Successfully!");
    } catch (error: any) {
      setOnFilterLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  return (
    <main>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Select
              showSearch
              style={{ width: "200px", marginBottom: "20px" }}
              placeholder="Filter Sales"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={[
                { label: "No Filter", value: "no-filter" },
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
              loading={onFilterLoading}
              onSelect={handelSaleFilter}
            />
          </div>
          <Table
            columns={columns}
            dataSource={sales.map((e: any) => ({ key: e._id, ...e }))}
          />
        </>
      )}
    </main>
  );
};

export default Sales;
