import {
  CopyFilled,
  DeleteFilled,
  EditFilled,
  ReadFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Button, Image, Skeleton, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddSaleModal from "../../components/ui/AddSaleModal";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetEyeglassesQuery } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const Eyeglasses = () => {
  const { data, isLoading, isError, error } = useGetEyeglassesQuery(undefined);

  const eyeglasses: TEyeglass[] = data?.data || [];

  // eyeglass sale model handling
  const [showModal, setShowModal] = useState(false);
  const [eyeglassId, setEyeglassId] = useState("");

  const handelOpenModal = (id: string) => {
    setShowModal(true);
    setEyeglassId(id);
  };

  // table columns setup
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image src={image} alt="Eyeglass" width={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (title: string) => <h3>{title}</h3>,
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
            <Link to={`/eyeglasses/${record._id}`}>
              <Button
                icon={<ReadFilled />}
                type="primary"
                style={{ background: "green", width: "100%" }}
              >
                View
              </Button>
            </Link>
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
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {/* ----------- Sale Eyeglasses Button ------------- */}
            <Button
              icon={<ShoppingFilled />}
              type="dashed"
              style={{ width: "100%" }}
              disabled={record.quantity <= 0}
              onClick={() => handelOpenModal(record._id)}
            >
              Sale
            </Button>
            <Button
              icon={<DeleteFilled />}
              type="primary"
              style={{ background: "red", width: "100%" }}
            >
              Delete
            </Button>
          </div>
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
          dataSource={eyeglasses.map((e: TEyeglass) => ({ key: e._id, ...e }))}
        />
      )}
      {/*  sale eyeglasses modal */}
      <AddSaleModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        id={eyeglassId}
      />
    </main>
  );
};

export default Eyeglasses;
