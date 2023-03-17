import { Button, DatePicker, Modal, notification } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import * as S from './style';

type Props = {
  visible: boolean;
  projectId: number;
  handleCancel: () => void;
  onClickHandle: () => void;
  publicOfferingEndedAt: Date;
};

export function AddDateModal({
  visible,
  handleCancel,
  projectId,
  onClickHandle,
  publicOfferingEndedAt,
}: Props) {
  const Btns = [1, 2, 3];
  const [able, setAble] = useState(1);

  const handleChange = (e: string) => {
    console.log(new Date(e));
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={600}
      closable
      centered
      footer={
        <Button style={{ margin: 'auto', display: 'flex' }} onClick={onClickHandle} type="primary">
          저장
        </Button>
      }
    >
      <S.Btns>
        {Btns.map((btn) => (
          <S.Btn
            onClick={() => setAble(btn)}
            style={{
              backgroundColor: `${able === btn ? '#5d28dd' : ''}`,
            }}
            key={btn}
          >
            {btn}차 연장
          </S.Btn>
        ))}
      </S.Btns>
      <S.Bottom>
        <span>공모 종료일</span>
        <DatePicker
          defaultValue={moment(publicOfferingEndedAt)}
          onChange={(e) => handleChange(moment(e).format('YYYY-MM-DD'))}
        />
      </S.Bottom>
    </Modal>
  );
}
