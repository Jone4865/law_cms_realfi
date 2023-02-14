import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Calendar } from '../../components/Calendar';
import { UserDetailModal } from '../../components/UserDetailModal';
import { userChangeColumns } from '../../utils/columns';
import moment from 'moment';
import { FIND_MANY_CHANGE_INVESTMENT_QUALIFICATION_BY_ADMIN } from '../../graphql/query';
import {
  ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput,
  FindManyChangeInvestmentQualificationByAdminQuery,
} from '../../graphql/generated/graphql';

export function Change() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [userData, setUserData] = useState<
    ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput[]
  >([]);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] =
    useState<ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClickRow = (
    rec: ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput,
  ) => {
    setModalData(rec);
    setVisible(true);
  };

  const handleSearch = (value: { searchText?: string }) => {
    findManyChangeInvestmentQualificationByAdmin({
      variables: {
        take,
        skip,
        searchText,
        gte: startDate.format('YYYY-MM-DD'),
        lt: endDate.format('YYYY-MM-DD'),
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

  // 요청 분기점
  const [findManyChangeInvestmentQualificationByAdmin, { loading }] =
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

  // 요청 코드
  useEffect(() => {
    findManyChangeInvestmentQualificationByAdmin({
      variables: {
        take,
        skip,
        searchText,
        gte: startDate.format('YYYY-MM-DD'),
        lt: endDate.format('YYYY-MM-DD'),
        fetchPolicy: 'no-cache',
      },
    });
  }, [take, skip, startDate, endDate]);

  return (
    <>
      <UserDetailModal
        visible={visible}
        handleCancel={handleCancel}
        email={modalData?.user.name ?? ''}
      />
      <Divider>한도변경 신청</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="이름, 닉네임, 상호명, 휴대폰번호"
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
        columns={userChangeColumns}
        dataSource={userData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        // loading={loading}
        style={{
          marginTop: 30,
        }}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
        // rowKey={(rec) => rec.email}
        scroll={{ x: 800 }}
      />
    </>
  );
}
