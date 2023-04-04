import React, { useEffect, useState } from 'react';
import { message, notification } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import * as S from './style';

import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  FIND_CHANGE_INVESTMENT_QUALIFICATION_COUNT_BY_ADMIN,
  FIND_USER_INQUIRY_COUNT_BY_ADMIN,
} from '../../graphql/query';

import Main from '../Main';
import { AsideMenu } from '../AsideMenu';
import useInterval from '../../utils/useInterval';
import {
  FIND_CHANGE_INVESTMENT_QUILIFICATION_COUNT_BY_ADMIN_SUB,
  FIND_USER_INQUIRY_COUNT_BY_ADMIN_SUB,
} from '../../graphql/subscription';
import { REFRESH_FROM_ADMIN } from '../../graphql/mutation';

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  partnerCount: number;
};

type Props = {
  setCookies: (name: 'login' | 'time', value: any) => void;
};

function Layout({ setCookies }: Props) {
  const navigator = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
    'time',
    'login',
  ]);
  const [time, setTime] = useState(3600000);
  const [changeCount, setChangeCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  useInterval(() => setTime((prev) => prev - 1000), 1000);
  let Min = Math.floor((time / (1000 * 60)) % 60);
  let Sec = (time / 1000) % 60;

  const [findChangeInvestmentQualificationCountByAdmin] = useLazyQuery(
    FIND_CHANGE_INVESTMENT_QUALIFICATION_COUNT_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setChangeCount(data.findChangeInvestmentQualificationCountByAdmin);
      },
    },
  );

  const [findUserInquiryCountByAdmin] = useLazyQuery(FIND_USER_INQUIRY_COUNT_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setInquiryCount(data.findUserInquiryCountByAdmin);
    },
  });

  const [refreshFromAdmin] = useMutation(REFRESH_FROM_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
      removeCookie('login');
      removeCookie('time');
      navigator('/login');
    },
    onCompleted: (_data) => {
      notification.success({ message: '토큰이 갱신되었습니다.' });
      setTime(3600000);
    },
  });

  useSubscription(FIND_USER_INQUIRY_COUNT_BY_ADMIN_SUB, {
    onData: (options) => {
      if (options.data.data?.findUserInquiryCountByAdminSub) {
        setInquiryCount(options.data.data?.findUserInquiryCountByAdminSub);
      }
    },
  });

  useSubscription(FIND_CHANGE_INVESTMENT_QUILIFICATION_COUNT_BY_ADMIN_SUB, {
    onData: (options) => {
      if (options.data.data?.findChangeInvestmentQualificationCountByAdminSub) {
        setChangeCount(options.data.data?.findChangeInvestmentQualificationCountByAdminSub);
      }
    },
  });

  useEffect(() => {
    setCookie('time', time);
    if (time <= 0) {
      refreshFromAdmin();
    }
  }, [time]);

  useEffect(() => {
    findChangeInvestmentQualificationCountByAdmin({});
    findUserInquiryCountByAdmin({});
    setTime(cookies.time ? cookies.time : 3600000);
  }, []);

  return (
    <S.Layout>
      <AsideMenu removeCookie={removeCookie} />
      <S.Layout $marginLeft={200}>
        <S.Content>
          <S.StatusBar>
            <S.NoticeContainer>
              <S.NoticeWrap>
                <S.Notice onClick={() => navigator('/users/change')}>한도변경 신청</S.Notice>
                {changeCount !== 0 && <S.Num>{changeCount}</S.Num>}
              </S.NoticeWrap>
              <S.NoticeWrap>
                <S.Notice onClick={() => navigator('/customer/inquiry')}>1:1 문의 알림</S.Notice>
                {inquiryCount !== 0 && <S.Num>{inquiryCount}</S.Num>}
              </S.NoticeWrap>
            </S.NoticeContainer>
            <S.Time>
              <FieldTimeOutlined style={{ color: 'white', marginRight: 10 }} />
              <span>
                {Min}:{Sec < 10 ? '0' + Sec : Sec}
              </span>
            </S.Time>
          </S.StatusBar>
          <Main />
        </S.Content>
        <S.Footer>Real-Fi ©2022 Created by Lawdians</S.Footer>
      </S.Layout>
    </S.Layout>
  );
}

export default Layout;
