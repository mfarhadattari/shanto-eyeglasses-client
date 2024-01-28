import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import EyeForm from "../form/EyeForm";
import EyeInput from "../form/EyeInput";

interface IAddSaleModal {
  open: boolean;
  onCancel: () => void;
  id: string;
}

const AddSaleModal = ({ open, onCancel, id }: IAddSaleModal) => {
  const [loading, setLoading] = useState(false);

  const onSaleSubmit = (values: FieldValues) => {
    setLoading(true);
    const saleData = {
      product: id,
      buyerName: values.buyerName,
      quantity: parseInt(values.quantity),
    };
    console.log(saleData);
    setLoading(false);
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <EyeForm
        style={{
          width: "300px",
          margin: "30px auto",
        }}
        onSubmit={onSaleSubmit}
      >
        <h3 style={{ textAlign: "center", margin: "10px", fontSize: "20px" }}>
          Sale Eyeglasses
        </h3>

        <EyeInput
          name="buyerName"
          placeholder="Buyer Name"
          type="text"
          requiredMessage="Please enter buyer name!"
        />
        <EyeInput
          name="quantity"
          placeholder="Quantity"
          type="number"
          requiredMessage="Please enter eyeglass quantity!"
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          Sale Eyeglass
        </Button>
      </EyeForm>
    </Modal>
  );
};

export default AddSaleModal;
