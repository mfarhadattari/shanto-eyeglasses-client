import { PrinterFilled } from "@ant-design/icons";
import { Button, Card, Descriptions, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetSaleDetailsQuery } from "../../redux/features/Sales/saleApi";
import {
  calculateSalePrice,
  capitalizeString,
  formatDate,
  invoiceGenerator,
} from "../../utils";

const SaleDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSaleDetailsQuery(
    id as string
  );
  const sale: any = data?.data;
  const productData: any = sale?.product;

  const getInvoice = () => {
    const payload = {
      id: sale._id,
      product: productData?.name,
      price: calculateSalePrice(sale?.quantity, productData?.price),
      quantity: sale?.quantity,
      buyer: sale?.buyerName,
      seller: sale?.seller?.name,
      time: formatDate(sale?.saleAt),
    };

    invoiceGenerator(payload);
  };

  return isLoading ? (
    <Skeleton active />
  ) : isError ? (
    <ErrorUI errorMessage={(error as any)?.data?.message} />
  ) : (
    <Card>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title
          level={5}
          style={{
            margin: "20px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Sale Details
        </Title>
        <Button onClick={getInvoice} icon={<PrinterFilled />} type="primary">
          Print Invoice
        </Button>
      </div>

      <Descriptions bordered>
        <Descriptions.Item label="Product Name">
          {productData?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Buyer Name">
          {sale?.buyerName}
        </Descriptions.Item>
        <Descriptions.Item label="Seller Name">
          {sale?.seller?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          ${calculateSalePrice(sale?.quantity, productData?.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">{sale?.quantity}</Descriptions.Item>
        <Descriptions.Item label="Sale Date">
          {formatDate(sale?.saleAt)}
        </Descriptions.Item>
      </Descriptions>

      <Title
        level={5}
        style={{
          margin: "20px",
          textTransform: "uppercase",
        }}
      >
        Product Details
      </Title>
      <Descriptions bordered>
        <Descriptions.Item label="Brand">
          {capitalizeString(productData?.brand)}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {capitalizeString(productData?.gender)}
        </Descriptions.Item>
        <Descriptions.Item label="Color">
          {capitalizeString(productData?.color)}
        </Descriptions.Item>
        <Descriptions.Item label="Frame Material">
          {capitalizeString(productData?.frameMaterial)}
        </Descriptions.Item>
        <Descriptions.Item label="Frame Shape">
          {capitalizeString(productData?.frameShape)}
        </Descriptions.Item>
        <Descriptions.Item label="Lens Type">
          {capitalizeString(productData?.lensType)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default SaleDetails;
