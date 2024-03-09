import { PrinterFilled } from "@ant-design/icons";
import { Button, Divider, Modal, Skeleton } from "antd";
import { useState } from "react";
import { useGetSaleDetailsQuery } from "../../redux/features/Sales/saleApi";
import { TSale } from "../../types/sale.type";
import { calculateSalePrice, formatDate, invoiceGenerator } from "../../utils";
import ErrorUI from "./ErrorUI";

interface IInvoiceModel {
  open: boolean;
  onCancel: () => void;
  id: string;
}

const InvoiceModel = ({ open, onCancel, id }: IInvoiceModel) => {
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, error } = useGetSaleDetailsQuery(
    id as string
  );
  const sale: TSale = data?.data;
  const productData = sale?.product;

  const printInvoice = async () => {
    setLoading(true);

    const payload = {
      id: sale._id,
      product: productData?.name,
      price: calculateSalePrice(sale?.quantity, sale?.productPrice),
      quantity: sale?.quantity,
      buyer: sale?.buyerName,
      seller: sale?.seller?.name,
      time: formatDate(sale?.saleAt),
    };

    invoiceGenerator(payload);
    setLoading(false);
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <>
          <Divider orientation="center">
            <h3
              style={{ textAlign: "center", margin: "10px", fontSize: "20px" }}
            >
              Invoice
            </h3>
          </Divider>

          <div
            style={{
              margin: "20px 0",
            }}
          >
            <h3>Product: {productData?.name} </h3>
            <h3>Buyer: {sale?.buyerName}</h3>
            <h3>Seller: {sale?.seller?.name}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
              }}
            >
              <h3>
                Price: ${calculateSalePrice(sale?.quantity, sale?.productPrice)}
              </h3>
              <h3>Quantity: {sale?.quantity}</h3>
            </div>
            <h3>Date: {formatDate(sale?.saleAt)}</h3>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={loading}
            icon={<PrinterFilled />}
            onClick={printInvoice}
          >
            Print Invoice
          </Button>
        </>
      )}
    </Modal>
  );
};

export default InvoiceModel;
