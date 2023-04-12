import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import {
  FindManyPublicOfferingExtensionByAdminOutput,
  FindManyPublicOfferingExtensionByAdminQuery,
} from '../../graphql/generated/graphql';
import { EXTEND_PUBLIC_OFFERING_BY_ADMIN } from '../../graphql/mutation';
import { FIND_MANY_PUBLICOFFERING_EXTENSION_BY_ADMIN } from '../../graphql/query';
import { AddDateInput } from './AddDateInput/AddDateInput';
import * as S from './style';

type Props = {
  visible: boolean;
  projectId: number;
  handleCancel: () => void;
};

export function AddDateModal({ visible, handleCancel, projectId }: Props) {
  const Btns = [1, 2, 3];
  const [able, setAble] = useState(1);
  const [publicOfferingExtensCount, setPublicOfferingExtensCount] = useState(0);
  const [publicOfferingExtensions, setPublicOfferingExtensions] =
    useState<FindManyPublicOfferingExtensionByAdminOutput['publicOfferingExtensions'][0]>();

  const [variables, setVariables] =
    useState<
      FindManyPublicOfferingExtensionByAdminQuery['findManyPublicOfferingExtensionByAdmin']['publicOfferingExtensions'][0]
    >();

  const handleOnChange = (key: string, value: string) => {
    setVariables((prev: any) => {
      let newVariables: any = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const onAddDateClick = () => {
    extendPublicOfferingByAdmin({
      variables: {
        id: projectId,
        newAllocationDate: variables?.newAllocationDate,
        newEndedAt: variables?.newEndedAt,
        newListedDate: variables?.newListedDate,
        newReceivingDate: variables?.newReceivingDate,
      },
    });
  };

  const [findManyPublicOfferingExtensionByAdmin] = useLazyQuery(
    FIND_MANY_PUBLICOFFERING_EXTENSION_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setVariables(
          data.findManyPublicOfferingExtensionByAdmin.publicOfferingExtensions[able - 1],
        );
        setPublicOfferingExtensions(
          data.findManyPublicOfferingExtensionByAdmin.publicOfferingExtensions[able - 1],
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
      handleCancel();
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
      <AddDateInput
        handleOnChange={handleOnChange}
        disabled={publicOfferingExtensCount < able ? false : true}
        title="공모 종료일"
        value={variables ? variables?.newEndedAt : undefined}
        disableDate={publicOfferingExtensions?.originEndedAt}
        saveName="newEndedAt"
        isBetwin
      />
      <AddDateInput
        handleOnChange={handleOnChange}
        disabled={publicOfferingExtensCount < able ? false : true}
        title="배정일"
        value={variables ? variables?.newAllocationDate : undefined}
        disableDate={publicOfferingExtensions?.originAllocationDate}
        saveName="newAllocationDate"
      />
      <AddDateInput
        handleOnChange={handleOnChange}
        disabled={publicOfferingExtensCount < able ? false : true}
        title="입고일"
        value={variables ? variables?.newReceivingDate : undefined}
        disableDate={publicOfferingExtensions?.originReceivingDate}
        saveName="newReceivingDate"
      />
      <AddDateInput
        handleOnChange={handleOnChange}
        disabled={publicOfferingExtensCount < able ? false : true}
        title="상장일"
        value={variables ? variables?.newListedDate : undefined}
        disableDate={publicOfferingExtensions?.originListedDate}
        saveName="newListedDate"
      />
      <AddDateInput
        disabled
        title="환불일"
        value={variables ? variables?.newEndedAt : undefined}
        disableDate={publicOfferingExtensions?.originEndedAt}
      />
    </Modal>
  );
}
