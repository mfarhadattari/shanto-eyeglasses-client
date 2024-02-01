import {
  CopyFilled,
  DeleteFilled,
  EditFilled,
  ReadFilled,
  SearchOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import { Breakpoint, Button, Image, Input, Skeleton, Table } from "antd";
import { Key, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AddSaleModal from "../../components/ui/AddSaleModal";
import BulkDeleteModal from "../../components/ui/BulkDeleteModal";
import DeleteConfirm from "../../components/ui/DeleteConfirm";
import ErrorUI from "../../components/ui/ErrorUI";
import FilterEyeglasses from "../../components/ui/FilterEyeglasses";
import usePageTitle from "../../hooks/usePageTitle";
import {
  useGetEyeglassesQuery,
  useSearchEyeglassMutation,
} from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";
import { capitalizeString } from "../../utils";

const Eyeglasses = () => {
  const title = usePageTitle("Eyeglasses Inventory");
  const [eyeglasses, setEyeglasses] = useState<TEyeglass[]>([]);
  const { data, isLoading, isError, error } = useGetEyeglassesQuery(undefined);

  useEffect(() => {
    setEyeglasses(data?.data || []);
  }, [data]);

  // eyeglass sale model handling
  const [showModal, setShowModal] = useState(false);
  const [eyeglassId, setEyeglassId] = useState("");

  const handelOpenModal = (id: string) => {
    setShowModal(true);
    setEyeglassId(id);
  };

  // ------------------>> eyeglass delete handling <<--------------------
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteEyeglassId, setDeleteEyeglassId] = useState("false");
  const [isDeleteOpe, setIsDeleteOpe] = useState(true);
  const handelEyeglassDeleteConfirm = (payload: {
    id: string;
    isDeleted: boolean;
  }) => {
    setDeleteEyeglassId(payload.id);
    setIsDeleteOpe(!payload.isDeleted);
    setDeleteConfirmOpen(true);
  };

  // --------------->> eyeglass search handling <<--------------------------
  const [searchEyeglasses] = useSearchEyeglassMutation();
  const onEyeglassesSearch = async (e: any) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setEyeglasses(data?.data);
    }
    try {
      const res = await searchEyeglasses(searchTerm).unwrap();
      if (res.data.length <= 0) {
        return toast.error("No data found!");
      }
      setEyeglasses(res.data);
    } catch (error: any) {
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  // ------------------->> eyeglass filter <<---------------------------
  const [isEyeglassFilter, setIsEyeglassFilter] = useState(false);

  // --------------->> bulk delete handling <<--------------------------
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const [selectedIdsForBulkDelete, setSelectedIdsForBulkDelete] = useState<
    Key[]
  >([]);

  const onSelectChange = (ids: Key[]) => {
    setSelectedIdsForBulkDelete(ids);
  };

  // --------------------->> table columns setup <<---------------------
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image src={image} alt="Eyeglass" width={100} height={100} />
      ),
      responsive: ["md"] as Breakpoint[],
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
      render: (_text: string, record: TEyeglass) => (
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
      responsive: ["md"] as Breakpoint[],
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (_text: string, record: TEyeglass) => (
        <>
          <p>
            <strong>Frame Material:</strong>{" "}
            {capitalizeString(record.frameMaterial)}
          </p>
          <p>
            <strong>Frame Shape:</strong> {capitalizeString(record.frameShape)}
          </p>
          <p>
            <strong>Lens Type:</strong> {capitalizeString(record.lensType)}
          </p>
        </>
      ),
      responsive: ["lg"] as Breakpoint[],
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (_text: string, record: TEyeglass) => (
        <>
          <p>
            <strong>Brand:</strong> {record.brand}
          </p>
          <p>
            <strong>Color:</strong> {record.color}
          </p>
          <p>
            <strong>Gender:</strong> {capitalizeString(record.gender)}
          </p>
        </>
      ),
      responsive: ["lg"] as Breakpoint[],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: TEyeglass) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "0px",
            margin: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {/* ----------- Eyeglass Details Button ------------- */}
            <Link style={{ width: "100%" }} to={`/eyeglasses/${record._id}`}>
              <Button
                icon={<ReadFilled />}
                type="primary"
                style={{ background: "green", width: "100%" }}
              >
                View
              </Button>
            </Link>
            {/* ----------- Edit Eyeglass Button ------------- */}
            <Link
              style={{ width: "100%" }}
              to={`/eyeglasses/update/${record._id}`}
            >
              <Button
                icon={<EditFilled />}
                type="primary"
                style={{ background: "maroon", width: "100%" }}
              >
                Edit
              </Button>
            </Link>
          </div>
          {/* ----------- Create Eyeglass Variant Button ------------- */}
          <Link
            style={{ width: "100%" }}
            to={`/eyeglasses/create-variant/${record._id}`}
          >
            <Button
              style={{ width: "100%" }}
              icon={<CopyFilled />}
              type="primary"
            >
              Create Variant
            </Button>
          </Link>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {/* ----------- Sale Eyeglass Button ------------- */}
            <Button
              icon={<ShoppingFilled />}
              type="dashed"
              style={{ width: "100%" }}
              disabled={record.quantity <= 0 || record.isDeleted}
              onClick={() => handelOpenModal(record._id)}
            >
              Sale
            </Button>
            {/* ----------- Delete Eyeglass Button ------------- */}
            <Button
              icon={<DeleteFilled />}
              type={record.isDeleted ? "dashed" : "primary"}
              danger
              onClick={() =>
                handelEyeglassDeleteConfirm({
                  id: record._id,
                  isDeleted: record.isDeleted,
                })
              }
            >
              {record.isDeleted ? "Back" : "Delete"}
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            {/* ------------------> Filter Eyeglasses <----------------- */}
            {isEyeglassFilter ? (
              <FilterEyeglasses
                setEyeglasses={setEyeglasses}
                setIsEyeglassFilter={setIsEyeglassFilter}
                preData={data?.data}
              />
            ) : (
              <Button
                onClick={() => setIsEyeglassFilter(true)}
                type="primary"
                ghost
                size="large"
              >
                Filter Eyeglass
              </Button>
            )}

            {/* --------------------> Search Eyeglasses <------------ */}
            <Input
              style={{
                marginBottom: "20px",
                width: "300px",
                display: `${isEyeglassFilter ? "none" : "flex"}`,
              }}
              placeholder="Search"
              prefix={<SearchOutlined />}
              allowClear
              size="large"
              type="search"
              onChange={onEyeglassesSearch}
            />
          </div>

          {/* ---------------------> Bulk Delete Eyeglasses <------------------ */}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <Button
              type="default"
              danger
              size="large"
              disabled={selectedIdsForBulkDelete.length <= 0}
              onClick={() => setShowBulkDeleteModal(true)}
              icon={<DeleteFilled />}
            >
              Delete{" "}
              {selectedIdsForBulkDelete.length > 0 &&
                selectedIdsForBulkDelete.length}
            </Button>
          </div>
          {/* ---------------------> Eyeglasses Table <------------------ */}
          <Table
            rowSelection={{
              selectedRowKeys: selectedIdsForBulkDelete,
              onChange: onSelectChange,
              getCheckboxProps: (record: TEyeglass) => ({
                disabled: record.isDeleted,
                name: record._id,
              }),
            }}
            pagination={{ position: ["topLeft"] }}
            columns={columns}
            dataSource={eyeglasses.map((e: TEyeglass) => ({
              key: e._id,
              ...e,
            }))}
          />
        </div>
      )}
      {/* ---------------->>  delete eyeglass modal <<------------------*/}
      <DeleteConfirm
        open={deleteConfirmOpen}
        id={deleteEyeglassId}
        onCancel={() => setDeleteConfirmOpen(false)}
        isDeleteOpe={isDeleteOpe}
      />
      {/* -------------->> sale eyeglasses modal <<-----------------*/}
      <BulkDeleteModal
        open={showBulkDeleteModal}
        onCancel={() => setShowBulkDeleteModal(false)}
        selectedIds={selectedIdsForBulkDelete}
        setSelectedIdsForBulkDelete={setSelectedIdsForBulkDelete}
      />
      {/* -------------->> sale eyeglasses modal <<-----------------*/}
      <AddSaleModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        id={eyeglassId}
      />
    </main>
  );
};

export default Eyeglasses;
