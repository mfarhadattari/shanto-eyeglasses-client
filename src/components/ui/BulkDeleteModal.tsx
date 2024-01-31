// src/components/BulkDelete.js

import { Alert, Modal } from "antd";
import { Dispatch, Key } from "react";
import { toast } from "sonner";
import { useBulkDeleteEyeglassesMutation } from "../../redux/features/Eyeglasses/eyeglassApi";

interface IBulkDeleteModal {
  open: boolean;
  onCancel: () => void;
  selectedIds: Key[];
  setSelectedIdsForBulkDelete: Dispatch<React.SetStateAction<Key[]>>;
}

const BulkDeleteModal = ({
  open,
  onCancel,
  selectedIds,
  setSelectedIdsForBulkDelete,
}: IBulkDeleteModal) => {
  const [bulkDeleteEyeglasses] = useBulkDeleteEyeglassesMutation();
  const handleBulkDelete = async () => {
    try {
      const res = await bulkDeleteEyeglasses(selectedIds).unwrap();
      toast.success(res.message);
      onCancel();
      setSelectedIdsForBulkDelete([]);
    } catch (error: any) {
      toast.error(`${error?.data?.message}` || "Something went wrong!");
    }
  };

  return (
    <Modal
      closeIcon={false}
      open={open}
      onCancel={onCancel}
      onOk={handleBulkDelete}
    >
      <Alert
        message="Warning"
        description={`Are you sure to delete ${selectedIds.length}?`}
        type="warning"
        showIcon
      />
    </Modal>
  );
};

export default BulkDeleteModal;
