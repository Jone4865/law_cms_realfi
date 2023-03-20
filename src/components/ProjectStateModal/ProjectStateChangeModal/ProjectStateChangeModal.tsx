import { Button, Modal } from 'antd';

type Props = {
  visible: boolean;
  handleCancel: () => void;
};

export function ProjectStateChangeModal({ visible, handleCancel }: Props) {
  const onClickHandle = () => {};
  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={600}
      closable
      centered
      footer={
        <Button style={{ margin: 'auto', display: 'flex' }} onClick={onClickHandle} type="primary">
          환불 진행
        </Button>
      }
    ></Modal>
  );
}
