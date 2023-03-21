import { useLazyQuery } from '@apollo/client';
import { Button, Divider, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Chart } from '../../components/Chart';
import {
  FindManyUserInquiryByAdminQuery,
  UserInquiryInFindManyUserInquiryByAdminOutput,
} from '../../graphql/generated/graphql';
import { FIND_MANY_STATS_BY_ADMIN, FIND_MANY_USER_INQUIRY_BY_ADMIN } from '../../graphql/query';
import { dashboardInquiryColumns } from '../../utils/columns';
import * as S from './style';

type DashboardStats = {
  [index: string]: any[];
  userCount: {
    day: any;
    result: number;
  }[];
};

export function Dashboard() {
  const [inquiryData, setInquiryData] = useState<UserInquiryInFindManyUserInquiryByAdminOutput[]>(
    [],
  );
  const [dashboardData, setDashboardData] = useState<DashboardStats>();
  const navigator = useNavigate();

  const chartTitle = [{ title: '회원수', keyword: 'userCount' }];

  const [findManyUserInquiryByAdmin] = useLazyQuery<FindManyUserInquiryByAdminQuery>(
    FIND_MANY_USER_INQUIRY_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setInquiryData(data.findManyUserInquiryByAdmin.userInquiries);
      },
    },
  );

  const [findManyStatsByAdmin] = useLazyQuery(FIND_MANY_STATS_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setDashboardData(data.findManyStatsByAdmin);
    },
  });

  useEffect(() => {
    findManyUserInquiryByAdmin({
      variables: {
        take: 5,
        skip: 0,
        searchText: '',
        userInquiryCategoryId: undefined,
      },
    });
    findManyStatsByAdmin();
  }, []);

  return (
    <>
      <Divider>대시보드</Divider>
      <S.ChartContainer>
        {chartTitle.map((v, i) => (
          <div key={i}>
            <S.ChartTitle>{v.title}</S.ChartTitle>
            <Chart data={dashboardData ? dashboardData[v.keyword] : []} />
          </div>
        ))}
      </S.ChartContainer>

      <S.Head>
        <h3>1:1 문의</h3>
        <Button
          type="link"
          style={{
            fontSize: 16,
          }}
          onClick={() => {
            navigator('/customer/inquiry');
          }}
        >
          자세히 보기 {'>'}
        </Button>
      </S.Head>
      <Table
        onRow={() => {
          return {
            onClick: () => navigator('/customer/inquiry'),
          };
        }}
        rowKey={(rec) => rec.id}
        columns={dashboardInquiryColumns}
        scroll={{ x: 800 }}
        dataSource={inquiryData}
        pagination={false}
      />
    </>
  );
}
