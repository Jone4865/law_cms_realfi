import { Button, Modal, notification } from 'antd';
import * as S from './style';

import { InputBasic } from '../ProjectAdd/InputBasic/InputBasic';
import { useLazyQuery } from '@apollo/client';
import { FIND_PUBLIC_OFFERING_BY_ADMIN } from '../../graphql/query';
import { useEffect, useState } from 'react';
import { FindPublicOfferingByAdminQuery } from '../../graphql/generated/graphql';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  publicOfferingId: number;
  publicOfferingState: string | undefined;
};

export function RefundDetailModal({
  visible,
  handleCancel,
  publicOfferingId,
  publicOfferingState,
}: Props) {
  const [data, setData] = useState<FindPublicOfferingByAdminQuery['findPublicOfferingByAdmin']>();
  const [findPublicOfferingByAdmin] = useLazyQuery(FIND_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setData(data.findPublicOfferingByAdmin);
    },
  });

  useEffect(() => {
    if (publicOfferingId !== 0) {
      findPublicOfferingByAdmin({
        variables: {
          id: publicOfferingId,
        },
      });
    }
  }, [publicOfferingId]);

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={600}
      closable
      centered
      footer={
        <Button style={{ margin: 'auto', display: 'flex' }} onClick={handleCancel} type="primary">
          확인
        </Button>
      }
    >
      <S.Title>공모 내용</S.Title>
      <S.Wrap>
        <InputBasic
          placeHolder={false}
          title="이름"
          value={data ? data?.user.name : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="핸드폰번호"
          value={data ? data?.user.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="공모 TABS"
          value={data ? +data?.quantity : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="공모 금액"
          value={data ? +data?.amount : ''}
          essential={false}
          disable
        />
      </S.Wrap>
      <S.Wrap>
        <InputBasic
          placeHolder={false}
          title="공모 일자"
          datePicker
          value={data ? data?.createdAt : ''}
          essential={false}
          disable
        />
      </S.Wrap>
      <S.Wrap>
        <InputBasic
          placeHolder={false}
          title="공모 완료 TABS"
          value={data ? +data?.quantity - (data?.cancelQuantity ? data?.cancelQuantity : 0) : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="공모 완료 금액"
          value={data ? +data?.amount : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="환불 TABS"
          value={data?.cancelQuantity ? +data?.cancelQuantity : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="환불 금액"
          value={data?.cancelAmount ? +data?.cancelAmount : ''}
          essential={false}
          disable
        />
      </S.Wrap>
      <S.Wrap>
        <InputBasic
          placeHolder={false}
          title="공모상태"
          value={publicOfferingState ? publicOfferingState : ''}
          essential={false}
          disable
        />
      </S.Wrap>
      <S.Wrap>
        <InputBasic
          placeHolder={false}
          title="환불일자"
          datePicker
          value={data ? data?.canceledAt : ''}
          essential={false}
          disable
        />
        <InputBasic
          placeHolder={false}
          title="환불"
          value={data?.canceledAt ? '환불 완료' : ''}
          essential={false}
          disable
          color={'red'}
        />
        <InputBasic
          placeHolder={false}
          title="책임자"
          value={data ? data?.adminName : ''}
          essential={false}
          disable
        />
      </S.Wrap>
    </Modal>
  );
}
