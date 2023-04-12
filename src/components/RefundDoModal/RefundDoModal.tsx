import { useLazyQuery } from '@apollo/client';
import { Button, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { FindPublicOfferingRefundInfoByAdminQuery } from '../../graphql/generated/graphql';
import { FIND_PUBLIC_OFFERING_REFUND_INFO_BY_ADMIN } from '../../graphql/query';

import { InputBasic } from '../ProjectAdd/InputBasic/InputBasic';

type Props = {
  visible: boolean;
  projectId: number;
  isAll: boolean;
  handleCancel: () => void;
  onClickHandle: (all: boolean) => void;
};

export function RefundDoModal({ visible, isAll, projectId, onClickHandle, handleCancel }: Props) {
  const [data, setData] =
    useState<FindPublicOfferingRefundInfoByAdminQuery['findPublicOfferingRefundInfoByAdmin']>();

  const [findPublicOfferingRefundInfoByAdmin] = useLazyQuery(
    FIND_PUBLIC_OFFERING_REFUND_INFO_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
        handleCancel();
      },
      onCompleted: (data) => {
        setData(data.findPublicOfferingRefundInfoByAdmin);
      },
    },
  );

  useEffect(() => {
    if (visible) {
      findPublicOfferingRefundInfoByAdmin({
        variables: {
          projectId,
        },
        fetchPolicy: 'no-cache',
      });
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={600}
      closable
      centered
      footer={
        <Button
          style={{ margin: 'auto', display: 'flex' }}
          onClick={() => onClickHandle(isAll)}
          type="primary"
        >
          환불 진행
        </Button>
      }
    >
      <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>
        {isAll ? '전체 환불' : '환불'}
      </p>
      <InputBasic
        title="환불 TABS 수"
        value={data ? data?.refundQuantity : ''}
        essential={false}
        disable
      />
      <InputBasic
        title="환불 금액"
        value={data ? +data?.refundAmount : ''}
        essential={false}
        disable
      />
      <InputBasic
        title="환불 일자"
        value={data ? data?.refundDate : ''}
        essential={false}
        disable
        datePicker
      />
      <InputBasic title="책임자" value={data ? data?.adminName : ''} essential={false} disable />
    </Modal>
  );
}
