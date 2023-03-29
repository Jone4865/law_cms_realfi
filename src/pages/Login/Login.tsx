import { useState } from 'react';
import { Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRecoilState } from 'recoil';

import { OtpInputModal } from '../../components/OtpInputModal';
import { useLazyQuery } from '@apollo/client';
import * as S from './style';
import { userTokenState } from '../../recoil/atoms/userToken';
import { SIGN_IN_FROM_ADMIN, VALIDATE_ADMIN } from '../../graphql/query';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

type SubmitType = {
  email: string;
  password: string;
  code: string;
};

export function Login() {
  const [visible, setVisible] = useState(false);
  const [otpImg, setOtpImg] = useState('');
  const [form] = useForm<SubmitType>();
  const navigator = useNavigate();
  const [, setToken] = useRecoilState(userTokenState);

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: SubmitType) => {
    if (!values.email?.trim().length) {
      return notification.error({ message: '이메일을 입력해주세요' });
    }
    if (!emailReg.test(values.email)) {
      return notification.error({ message: '이메일 형식을 맞춰주세요' });
    }
    if (!values.password?.trim().length) {
      return notification.error({ message: '비밀번호를 입력해주세요' });
    }
    validateAdmin({
      variables: {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
      },
    });
  };

  const handleFinish = (otp: string[]) => {
    var code = otp.concat().join().replaceAll(',', '');
    const userInfo: SubmitType = {
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password'),
      code,
    };
    signInFromAdmin({ variables: userInfo });
  };

  const [validateAdmin] = useLazyQuery(VALIDATE_ADMIN, {
    onError: (error) => {
      notification.error({ message: error?.message });
    },
    onCompleted: (data) => {
      setVisible(true);
      if (data.validateAdmin) {
        setOtpImg(data.validateAdmin);
      }
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const [signInFromAdmin, { loading }] = useLazyQuery(SIGN_IN_FROM_ADMIN, {
    onError: (error) => {
      notification.error({ message: error?.message });
    },
    onCompleted: (_data) => {
      return navigator('/');
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <S.Container>
      <OtpInputModal
        loading={false}
        visible={visible}
        handleFinish={handleFinish}
        onCancel={handleCancel}
        otpImg={otpImg}
      />
      <S.Wrapper>
        <S.FormWrap>
          <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <S.ImageWrap>
              <S.Image src={'/img/logo.png'} alt="logo" />
            </S.ImageWrap>
            <Form.Item label="이메일" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="비밀번호" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <S.Button type="submit">로그인</S.Button>
            </Form.Item>
          </Form>
        </S.FormWrap>
      </S.Wrapper>
    </S.Container>
  );
}
