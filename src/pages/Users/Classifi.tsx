import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table, Button } from 'antd';

import React, { useEffect, useState } from 'react';
import { UserDetailModal } from '../../components/UserDetailModal';
import { UserType, userClassifiColumns } from '../../utils/columns';
import TransformBox from '../../components/TransformBox';

export function Classifi() {
  const [userData, setUserData] = useState<UserType[]>([
    {
      createdAt: 'dawdawdaw',
      email: 'dawdawdwa@dawd.cp',
      name: 'dawdwa',
      nickname: 'dawdwad',
      phone: '01099999999',
      do: 'dadaw',
      max: 'dawda',
      content: 'da',
      shippingAddresses: [{ address: 'dwdaw', addressDetail: 'dawdawd', id: 0, isDefault: true }],
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<UserType>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleClick = () => {
    setVisible(true);
    setModalData(undefined);
  };

  return (
    <>
      <UserDetailModal
        visible={visible}
        handleCancel={handleCancel}
        email={modalData?.email ?? ''}
      />
      <Divider>회원분류</Divider>
      <TransformBox justifyContent="flex-end" marginBottom={'30px'}>
        <Button type="primary" onClick={handleClick}>
          분류 생성
        </Button>
      </TransformBox>
      <Table
        columns={userClassifiColumns}
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
        rowKey={(rec) => rec.email}
        scroll={{ x: 800 }}
      />
    </>
  );
}
