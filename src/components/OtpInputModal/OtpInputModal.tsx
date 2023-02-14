import { Modal, Popover } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Loader from '../Loader';

import * as S from './style';

type Props = {
  visible: boolean;
  loading: boolean;
  onCancel: () => void;
  handleFinish: (otp: string[]) => void;
  otpImg?: string;
};

export function OtpInputModal({ visible, loading, onCancel, handleFinish, otpImg }: Props) {
  const PopupContent = (
    <div
      style={{
        fontSize: '15px',
        fontWeight: 'bold',
        display: 'flex',
        paddingTop: '15px',
        color: 'white',
      }}
    >
      <p>관리자에게 문의 부탁드립니다.</p>
    </div>
  );

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRef = useRef<HTMLInputElement[]>([]);

  const handleChangeInput = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setOtp((prev) => {
      prev[index] = e.target.value.replace(/\D/g, '');
      return [...prev];
    });
    if (e.target.value.replace(/\D/g, '').length > 0) {
      if (index === 5) {
        return;
      }
      handleFocus(index + 1);
    }
  };

  const handleCancel = () => {
    setOtp((prev) => {
      if (prev.length) {
        prev.map((_v, i) => (prev[i] = ''));
      }
      return [...prev];
    });
    onCancel();
  };

  const handleFocus = (idx: number) => {
    inputRef.current[idx].focus();
  };

  useEffect(() => {
    if (otp[5].length) {
      handleFinish(otp);
    }
  }, [otp]);

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={false}
      centered
      closable={false}
      width={800}
    >
      {otpImg && (
        <S.ModalTop>
          <S.TopTitle>처음 접속하셨나요?</S.TopTitle>
          <span>
            Android 사용자는 구글 플레이에서 Googole OTP를 검색하여 설치해주세요.
            <br />
            iOS 사용자는 앱 스토어에서 Google OTP를 검색하여 설치해주세요.
            <br />
            {otpImg &&
              '설치가 완료되었다면 아래의 QR코드를 스캔해서 나오는 인증번호를 입력해주세요.'}
          </span>
          <S.OtpImageWrap>
            <S.OtpImage
              style={{ backgroundImage: `url(${otpImg})`, backgroundSize: '100% 100%' }}
            />
          </S.OtpImageWrap>
        </S.ModalTop>
      )}
      <S.ModalTitle>OTP 인증번호</S.ModalTitle>
      {loading && <Loader />}
      <S.OtpWrap>
        {otp.map((v, i) => (
          <S.OtpInput
            ref={(elem) => {
              if (elem) {
                inputRef.current[i] = elem;
              }
            }}
            key={i}
            maxLength={1}
            value={v}
            autoFocus={!i}
            onChange={handleChangeInput(i)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && i !== 0 && !otp[i].length) {
                handleFocus(i - 1);
              }
              setOtp((prev) => {
                prev[i] = '';
                return [...prev];
              });
            }}
          />
        ))}
      </S.OtpWrap>
      <S.Bottom>
        <S.BottomTitle>구글 OTP 앱을 확인하여 코드를 입력하세요.</S.BottomTitle>
        <Popover content={PopupContent} title="" trigger="hover" placement="bottom" color="black">
          <span>구글 OTP 등록이 필요하신가요?</span>
        </Popover>
      </S.Bottom>
    </Modal>
  );
}
