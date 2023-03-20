import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Calendar } from '../../components/Calendar';
import { userChangeColumns } from '../../utils/columns';
import moment from 'moment';
import { FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN } from '../../graphql/query';
import {
  ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput,
  FindManyChangeInvestmentQualificationByAdminQuery,
} from '../../graphql/generated/graphql';
import { useNavigate } from 'react-router-dom';

export function Change() {
  const navigator = useNavigate();
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [userData, setUserData] = useState<
    ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput[]
  >([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleClickRow = (
    rec: ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput,
  ) => {
    navigator(`/users/change/${rec.user?.name}`);
  };

  const handleSearch = (value: { searchText?: string }) => {
    findManyChangeInvestmentQualificationByAdmin({
      variables: {
        take,
        skip,
        searchText,
        gte: new Date(moment(startDate).format('YYYY-MM-DD 00:00:00')),
        lt: endDate,
      },
      fetchPolicy: 'no-cache',
    });
    setSkip(0);
    setCurrent(1);
    setSearchText(value.searchText ?? '');
  };

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const [findManyChangeInvestmentQualificationByAdmin] =
    useLazyQuery<FindManyChangeInvestmentQualificationByAdminQuery>(
      FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN,
      {
        onError: (error) => {
          notification.error({ message: error.message });
        },
        onCompleted: (data) => {
          setUserData(
            data.findManyChangeInvestmentQualificationByAdmin.changeInvestmentQualifications,
          );
          setTotalCount(data.findManyChangeInvestmentQualificationByAdmin.totalCount);
        },
      },
    );

  useEffect(() => {
    findManyChangeInvestmentQualificationByAdmin({
      variables: {
        take,
        skip,
        searchText,
        gte: startDate.format('YYYY-MM-DD'),
        lt: endDate.add(1, 'd').format('YYYY-MM-DD'),
      },
      fetchPolicy: 'no-cache',
    });
  }, [take, skip, startDate, endDate]);

  return (
    <>
      <Divider>한도변경 신청</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="이름, 휴대폰번호"
            onSearch={(e) => {
              handleSearch({ searchText: e });
            }}
          />
        </Form.Item>
      </Form>
      <Calendar
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      <Table
        columns={userChangeColumns({})}
        dataSource={userData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: 30,
        }}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
        scroll={{ x: 800 }}
      />
    </>
  );
}
