import { Alert, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteEyeglassMutation } from "../../redux/features/Eyeglasses/eyeglassApi";

interface IDeleteCConfirm {
  open: boolean;
  onCancel: () => void;
  id: string;
  isDeleteOpe: boolean;
}

const DeleteConfirm = ({
  open,
  onCancel,
  id,
  isDeleteOpe,
}: IDeleteCConfirm) => {
  const [deleteEyeglass] = useDeleteEyeglassMutation();

  const [loading, isLoading] = useState(false);

  const handelDeleteConfirm = async () => {
    isLoading(true);
    try {
      const res = await deleteEyeglass(id).unwrap();
      isLoading(false);
      onCancel();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(`${error?.data.message}` || "Something went wrong!");
      isLoading(false);
    }
  };
  return (
    <Modal
      closeIcon={false}
      open={open}
      onCancel={onCancel}
      onOk={handelDeleteConfirm}
      confirmLoading={loading}
    >
      <Alert
        message="Warning"
        description={
          isDeleteOpe
            ? "Are you sure to delete?"
            : "Are you sure to delete back?"
        }
        type="warning"
        showIcon
      />
    </Modal>
  );
};

export default DeleteConfirm;
