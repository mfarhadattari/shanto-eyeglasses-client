import { Skeleton, Table, TableColumnType } from "antd";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetEyeglassesQuery } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const columns: TableColumnType<TEyeglass> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price & Quantity",
    dataIndex: "price",
  },
  {
    title: "Address",
    dataIndex: "address",
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
