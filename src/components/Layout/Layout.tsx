import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import * as S from './style';

import { useLazyQuery, useSubscription } from '@apollo/client';
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

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  partnerCount: number;
};

function Layout() {
  const navigator = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'time']);
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

  useSubscription(FIND_USER_INQUIRY_COUNT_BY_ADMIN_SUB, {
    onData: ({ data }) => {
      console.log({ data });
      // console.log(options.data.data?.findUserInquiryCountByAdminSub);
      // if (options.data.data?.findUserInquiryCountByAdminSub) {
      //   setInquiryCount(options.data.data?.findUserInquiryCountByAdminSub);
      // }
    },
  });

  useSubscription(FIND_CHANGE_INVESTMENT_QUILIFICATION_COUNT_BY_ADMIN_SUB, {
    onData: (options) => {
      console.log(options.data.data?.findChangeInvestmentQualificationCountByAdminSub);
      if (options.data.data?.findChangeInvestmentQualificationCountByAdminSub) {
        setChangeCount(options.data.data?.findChangeInvestmentQualificationCountByAdminSub);
      }
    },
  });

  useEffect(() => {
    setCookie('time', time);
    if (time <= 0) {
      setCookie('accessToken', '');
      setCookie('refreshToken', '');
      removeCookie('time');
      window.location.href = '/login';
    }
  }, [time]);

  useEffect(() => {
    findChangeInvestmentQualificationCountByAdmin({});
    findUserInquiryCountByAdmin({});
    setTime(cookies.time ? cookies.time : 3600000);
  }, []);

  return (
    <S.Layout>
      <AsideMenu />
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
        <S.Footer>projectName ©2022 Created by Lawdians</S.Footer>
      </S.Layout>
    </S.Layout>
  );
}

export default Layout;
