import { Modal } from 'antd';

type Props = {
  handleCancel: () => void;
  visible: boolean;
};

export function UserTransactionModal({ handleCancel, visible }: Props) {
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
