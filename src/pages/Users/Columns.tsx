import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FindManyUserByAdminQuery,
  UserInFindManyUserByAdminOutput,
} from '../../graphql/generated/graphql';
import { FIND_MANY_USERS_BY_ADMIN } from '../../graphql/query';

import { userListColumns } from '../../utils/columns';

export function Columns() {
  const [userData, setUserData] = useState<UserInFindManyUserByAdminOutput[]>([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState('');
  const navigator = useNavigate();

  const handleClickRow = (rec: UserInFindManyUserByAdminOutput) => {
    navigator(`/users/${rec.email}`);
  };

  const handleSearch = (value: { searchText?: string }) => {
    findManyUserByAdmin({
      variables: {
        take,
        skip,
        searchText,
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

  const [findManyUserByAdmin] = useLazyQuery<FindManyUserByAdminQuery>(FIND_MANY_USERS_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setUserData(data.findManyUserByAdmin.users);
      setTotalCount(data.findManyUserByAdmin.totalCount);
    },
  });

  useEffect(() => {
    findManyUserByAdmin({
      variables: {
        take,
        skip,
        searchText,
      },
      fetchPolicy: 'no-cache',
    });
  }, [take, skip, searchText]);

  return (
    <>
      <Divider>회원목록</Divider>
      <Form style={{ width: '300px' }} onFinish={handleSearch}>
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
      <Table
        columns={userListColumns({})}
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
