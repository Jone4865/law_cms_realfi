import { Divider, Table } from 'antd';

import React, { useState } from 'react';
import { UserDetailModal } from '../../components/UserDetailModal';
import { UserType, userClassifiColumns, ClassifiType } from '../../utils/columns';

export function Classifi() {
  const [userData] = useState<ClassifiType[]>([
    {
      id: 1,
      name: '일반투자자',
      content: '투자한도 범위 연 2,000만원 이내',
      max: '2,000만원',
    },
    {
      id: 2,
      name: '소득적격 투자자',
      content: '투자한도 범위 연 4,000만원 이내',
      max: '4,000만원',
    },
    {
      id: 3,
      name: '전문 투자자',
      content: '투자한도 범위 무제한',
      max: '무제한',
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
      {/* <TransformBox justifyContent="flex-end" marginBottom={'30px'}>
        <Button type="primary" onClick={handleClick}>
          분류 생성
        </Button>
      </TransformBox> */}
      <Table
        columns={userClassifiColumns}
        dataSource={userData}
        // pagination={{
        //   position: ['bottomCenter'],
        //   showSizeChanger: true,
        //   onChange: handlePagination,
        //   onShowSizeChange: (_current, size) => setTake(size),
        //   total: totalCount,
        //   current: current,
        // }}
        pagination={false}
        style={{
          marginTop: 30,
        }}
        scroll={{ x: 800 }}
      />
    </>
  );
}
