// src/components/BulkDelete.js

import { Alert, Modal } from "antd";
import { Dispatch, Key, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const handleBulkDelete = async () => {
    setLoading(true);
    try {
      const res = await bulkDeleteEyeglasses(selectedIds).unwrap();
      setSelectedIdsForBulkDelete([]);
      setLoading(false);
      onCancel();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(`${error?.data?.message}` || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Modal
      closeIcon={false}
      open={open}
      onCancel={onCancel}
      onOk={handleBulkDelete}
      confirmLoading={loading}
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
