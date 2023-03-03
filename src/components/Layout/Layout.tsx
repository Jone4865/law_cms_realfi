import React, { useEffect, useState } from 'react';
import useInterval from '../../utils/useInterval';

import * as S from './style';
import { FieldTimeOutlined } from '@ant-design/icons';
import { AsideMenu } from '../AsideMenu';
import Main from '../Main';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  partnerCount: number;
};

function Layout() {
  const navigator = useNavigate();
  const [, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const [time, setTime] = useState(3600000);
  useInterval(() => setTime((prev) => prev - 1000), 1000);
  let Min = Math.floor((time / (1000 * 60)) % 60);
  let Sec = (time / 1000) % 60;

  useEffect(() => {
    if (time <= 0) {
      setCookie('accessToken', '');
      setCookie('refreshToken', '');
      window.location.href = '/login';
    }
  }, [time]);

  return (
    <S.Layout>
      <AsideMenu />
      <S.Layout $marginLeft={200}>
        <S.Content>
          <S.StatusBar>
            <S.NoticeContainer>
              <S.NoticeWrap>
                <S.Notice onClick={() => navigator('/users/change')}>한도변경 신청</S.Notice>
                <S.Num>3</S.Num>
              </S.NoticeWrap>
              <S.NoticeWrap>
                <S.Notice onClick={() => navigator('/customer/inquiry')}>1:1 문의 알림</S.Notice>
                <S.Num>2</S.Num>
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
