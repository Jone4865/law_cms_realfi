import { useMutation } from '@apollo/client';
import { Button, DatePicker, Modal, notification } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { EXTEND_PUBLIC_OFFERING_BY_ADMIN } from '../../graphql/mutation';
import * as S from './style';

type Props = {
  visible: boolean;
  projectId: number;
  handleCancel: () => void;
  publicOfferingEndedAt: Date;
};

export function AddDateModal({ visible, handleCancel, projectId, publicOfferingEndedAt }: Props) {
  const Btns = [1, 2, 3];
  const [able, setAble] = useState(1);
  const [newEndedAt, setNewEndedAt] = useState<Date>();

  const handleOnChange = (e: string) => {
    setNewEndedAt(new Date(e));
  };

  const onAddDateClick = () => {
    extendPublicOfferingByAdmin({ variables: { id: projectId, newEndedAt } });
  };

  const [extendPublicOfferingByAdmin] = useMutation(EXTEND_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '공모기간을 수정했습니다.' });
    },
  });

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={600}
      closable
      centered
      footer={
        <Button style={{ margin: 'auto', display: 'flex' }} onClick={onAddDateClick} type="primary">
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
          disabledDate={(date) =>
            !moment(date).isBetween(
              moment(publicOfferingEndedAt),
              moment(publicOfferingEndedAt).add('d', 4),
            )
          }
          defaultValue={moment(publicOfferingEndedAt)}
          onChange={(e) => handleOnChange(moment(e).format('YYYY-MM-DD'))}
        />
      </S.Bottom>
    </Modal>
  );
}
