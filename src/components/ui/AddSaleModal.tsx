import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddSaleMutation } from "../../redux/features/Sales/saleApi";
import EyeForm from "../form/EyeForm";
import EyeInput from "../form/EyeInput";

interface IAddSaleModal {
  open: boolean;
  onCancel: () => void;
  id: string;
}

const AddSaleModal = ({ open, onCancel, id }: IAddSaleModal) => {
  const [loading, setLoading] = useState(false);
  const [addSale] = useAddSaleMutation();
  const methods = useForm();

  const onSaleSubmit = async (values: FieldValues) => {
    setLoading(true);
    const saleData = {
      product: id,
      buyerName: values.buyerName,
      quantity: parseInt(values.quantity),
    };
    const res = await addSale(saleData);
    if ((res as any)?.data?.success) {
      toast.success(`${(res as any)?.data?.message}!`);
      methods.reset();
      onCancel();
    } else if ((res as any)?.error) {
      toast.error(`${(res as any)?.error?.data?.message}!`);
    } else {
      toast.error(`Something went wrong!`);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <EyeForm
        methods={methods}
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
