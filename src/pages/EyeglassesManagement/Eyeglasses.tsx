import {
  CopyFilled,
  DeleteFilled,
  EditFilled,
  ReadFilled,
} from "@ant-design/icons";
import { Button, Image, Skeleton, Table } from "antd";
import { Link } from "react-router-dom";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetEyeglassesQuery } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: string) => <Image src={image} alt="Eyeglass" width={100} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price & Quantity",
    dataIndex: "price&Quantity",
    key: "details",
    render: (text: string, record: TEyeglass) => (
      <>
        <p>
          <strong>Price: {record.price} </strong>
        </p>
        <p>
          <strong style={{ color: `${record.quantity < 5 && "red"}` }}>
            Quantity: {record.quantity}{" "}
          </strong>
        </p>
      </>
    ),
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
    render: (text: string, record: TEyeglass) => (
      <>
        <p>
          <strong>Frame Material:</strong> {record.frameMaterial}
        </p>
        <p>
          <strong>Frame Shape:</strong> {record.frameShape}
        </p>
        <p>
          <strong>Lens Type:</strong> {record.lensType}
        </p>
      </>
    ),
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
    render: (text: string, record: TEyeglass) => (
      <>
        <p>
          <strong>Brand:</strong> {record.brand}
        </p>
        <p>
          <strong>Color:</strong> {record.color}
        </p>
        <p>
          <strong>Gender:</strong> {record.gender}
        </p>
      </>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (text: string, record: TEyeglass) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Button
            icon={<ReadFilled />}
            type="primary"
            style={{ background: "green", width: "100%" }}
          >
            <Link to={`/eyeglasses/${record._id}`}>View</Link>
          </Button>
          <Button
            icon={<EditFilled />}
            type="primary"
            style={{ background: "maroon", width: "100%" }}
          >
            Edit
          </Button>
        </div>
        <Button icon={<CopyFilled />} type="primary">
          Create Variant
        </Button>
        <Button
          icon={<DeleteFilled />}
          type="primary"
          style={{ background: "red", width: "100%" }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

const Eyeglasses = () => {
  const { data, isLoading, isError, error } = useGetEyeglassesQuery(undefined);

  const eyeglasses: TEyeglass[] = data?.data || [];

  return (
    <main>
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <Table
          columns={columns}
          dataSource={eyeglasses.map((e: TEyeglass) => ({ key: e._id, ...e }))}
        />
      )}
    </main>
  );
};

export default Eyeglasses;
