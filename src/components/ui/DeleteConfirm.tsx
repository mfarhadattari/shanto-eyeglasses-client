import { Alert, Modal } from "antd";
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

  const handelDeleteConfirm = async () => {
    try {
      const res = await deleteEyeglass(id).unwrap();
      toast.success(res.message);
      onCancel();
    } catch (error: any) {
      toast.error(`${error?.data.message}` || "Something went wrong!");
    }
  };
  return (
    <Modal
      closeIcon={false}
      open={open}
      onCancel={onCancel}
      onOk={handelDeleteConfirm}
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
