import { Modal, notification, Image, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import TransformBox from '../TransformBox';
import * as S from './style';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  handleNext: () => void;
  otpSecret: string;
};

export function OtpQrModal({ visible, handleNext, handleCancel, otpSecret }: Props) {
  const [imageUrl, setImageUrl] = useState('');

  const handleCopy = () => {
    navigator.clipboard
      .writeText(otpSecret)
      .then(() => {
        notification.success({ message: 'OTP KEY를 복사했습니다.' });
      })
      .catch((e) => {
        notification.error({ message: e.message });
      });
  };

  useEffect(() => {}, [visible]);

  return (
    <Modal
      centered
      footer={false}
      onCancel={handleCancel}
      open={visible}
      closable={false}
      focusTriggerAfterClose={false}
    >
      <S.QRWrap>
        <Image src={imageUrl} />
      </S.QRWrap>
      <TransformBox justifyContent="center" alignItems="center" flexDirection="column">
        <S.KeyWrap>key: {otpSecret}</S.KeyWrap>
        <Button onClick={handleCopy}>복사</Button>
      </TransformBox>
      <TransformBox justifyContent="flex-end" marginTop="20px">
        <Button type="primary" onClick={handleNext}>
          다음
        </Button>
      </TransformBox>
    </Modal>
  );
}
