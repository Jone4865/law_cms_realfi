import { Button, Modal, notification } from 'antd';
import * as S from './style';

import { InputBasic } from '../ProjectAdd/InputBasic/InputBasic';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_DIVIDEND_BY_ADMIN } from '../../graphql/mutation';

type Props = {
  visible: boolean;
  projectId: number;
  publicOfferingQuantity: number | undefined;
  handleCancel: () => void;
};

export function DividendDetailModal({
  visible,
  handleCancel,
  publicOfferingQuantity,
  projectId,
}: Props) {
  const [variables, setVariables] = useState<any>();

  const handleChange = (key: string, value: any) => {
    setVariables((prev: any) => {
      let newVariables: any = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const handleCreateDividend = () => {
    if (variables === undefined) {
      return notification.error({ message: '배당명을 입력해주세요.' });
    }
    if (variables.operatingProfit === undefined || +variables.operatingProfit === 0) {
      return notification.error({ message: '운영이익금을 확인해주세요.' });
    }
    if (variables.closingDate === undefined) {
      return notification.error({ message: '기준일을 입력해주세요.' });
    }

    createProjectDividendByAdmin({
      variables: {
        ...variables,
        projectId: projectId,
      },
    });
  };

  const [createProjectDividendByAdmin] = useMutation(CREATE_PROJECT_DIVIDEND_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '배당 설정을 완료했습니다.' });
      handleCancel();
    },
  });

  return (
    <Modal
      open={visible}
      onCancel={() => {
        handleCancel();
        setVariables(undefined);
      }}
      width={600}
      closable
      centered
      footer={
        <Button
          style={{ margin: 'auto', display: 'flex' }}
          onClick={handleCreateDividend}
          type="primary"
        >
          확인
        </Button>
      }
    >
      <S.Title>배당 설정</S.Title>
      <InputBasic
        title="배당명"
        value={variables?.name}
        essential={false}
        handleChange={handleChange}
        saveName="name"
      />
      <InputBasic
        title="운영이익금(원)"
        value={+variables?.operatingProfit}
        essential={false}
        handleChange={handleChange}
        saveName="operatingProfit"
      />
      <InputBasic
        placeHolder={false}
        title="TABS 수"
        value={publicOfferingQuantity}
        essential={false}
        disable
        handleChange={handleChange}
      />
      <InputBasic
        placeHolder={false}
        title="TABS 배당금 (원)"
        value={publicOfferingQuantity && +variables?.operatingProfit / +publicOfferingQuantity}
        essential={false}
        disable
        handleChange={handleChange}
      />
      <InputBasic
        placeHolder={false}
        title="기준일"
        value={variables?.closingDate}
        essential={false}
        datePicker
        handleChange={handleChange}
        saveName="closingDate"
      />
    </Modal>
  );
}
