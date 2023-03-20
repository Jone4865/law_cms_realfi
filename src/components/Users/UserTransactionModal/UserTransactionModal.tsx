import { Modal } from 'antd';

type Props = {
  visible: boolean;
  handleCancel: () => void;
};

export function UserTransactionModal({ visible, handleCancel }: Props) {
  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={false}
      title={`의 상세정보`}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
      centered
      width={1000}
    ></Modal>
  );
}
