import { Alert, Modal } from "antd";
import { toast } from "sonner";
import { useDeleteEyeglassMutation } from "../../redux/features/Eyeglasses/eyeglassApi";

interface IDeleteCConfirm {
  open: boolean;
  onCancel: () => void;
  id: string;
}

const DeleteConfirm = ({ open, onCancel, id }: IDeleteCConfirm) => {
  const [deleteEyeglass] = useDeleteEyeglassMutation();

  const handelDeleteConfirm = async () => {
    try {
      const res = await deleteEyeglass(id).unwrap();
      toast.success(res.message);
      onCancel();
    } catch (error) {
      console.log(error);
      toast.error(`` || "Something went wrong!");
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
        description="Are you sure to delete?"
        type="warning"
        showIcon
      />
    </Modal>
  );
};

export default DeleteConfirm;
