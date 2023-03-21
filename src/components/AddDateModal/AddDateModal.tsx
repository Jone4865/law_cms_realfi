import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, DatePicker, Modal, notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FindManyPublicOfferingExtensionByAdminOutput } from '../../graphql/generated/graphql';
import { EXTEND_PUBLIC_OFFERING_BY_ADMIN } from '../../graphql/mutation';
import { FIND_MANY_PUBLICOFFERING_EXTENSION_BY_ADMIN } from '../../graphql/query';
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
  const [publicOfferingExtensCount, setPublicOfferingExtensCount] = useState(0);
  const [publicOfferingExtensions, setPublicOfferingExtensions] =
    useState<FindManyPublicOfferingExtensionByAdminOutput['publicOfferingExtensions']>();
  const handleOnChange = (e: string) => {
    setNewEndedAt(new Date(e));
  };

  const onAddDateClick = () => {
    extendPublicOfferingByAdmin({ variables: { id: projectId, newEndedAt } });
  };

  const [findManyPublicOfferingExtensionByAdmin] = useLazyQuery(
    FIND_MANY_PUBLICOFFERING_EXTENSION_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setPublicOfferingExtensions(
          data.findManyPublicOfferingExtensionByAdmin.publicOfferingExtensions,
        );
        setNewEndedAt(
          data.findManyPublicOfferingExtensionByAdmin.publicOfferingExtensions[able - 1].newEndedAt,
        );
        setPublicOfferingExtensCount(data.findManyPublicOfferingExtensionByAdmin.totalCount);
      },
    },
  );

  const [extendPublicOfferingByAdmin] = useMutation(EXTEND_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '공모기간을 수정했습니다.' });
    },
  });

  useEffect(() => {
    findManyPublicOfferingExtensionByAdmin({
      variables: {
        projectId: projectId ? projectId : 0,
      },
    });
  }, [able]);

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
            onClick={() => (btn <= publicOfferingExtensCount + 1 ? setAble(btn) : '')}
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
          disabled={publicOfferingExtensCount < able ? false : true}
          disabledDate={(date) =>
            !moment(date).isBetween(
              moment(publicOfferingEndedAt),
              moment(publicOfferingEndedAt).add('d', 4),
            )
          }
          value={moment(newEndedAt ? newEndedAt : publicOfferingEndedAt)}
          onChange={(e) => handleOnChange(moment(e).format('YYYY-MM-DD'))}
        />
      </S.Bottom>
    </Modal>
  );
}
