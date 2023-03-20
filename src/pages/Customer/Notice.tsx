import React, { useEffect, useState } from 'react';
import { Button, Divider, notification, Table } from 'antd';

import { useLazyQuery } from '@apollo/client';
import { NoticeDetailModal } from '../../components/NoticeDetailModal';
import TransformBox from '../../components/TransformBox';
import { noticeColumns } from '../../utils/columns';
import { FIND_MANY_NOTICE_BY_ADMIN } from '../../graphql/query';
import {
  FindManyNoticeByAdminOutput,
  FindManyNoticeByAdminQuery,
  NoticeInFindManyNoticeByAdminOutput,
} from '../../graphql/generated/graphql';

export function Notice() {
  const [noticeData, setNoticeData] = useState<FindManyNoticeByAdminOutput['notices']>([]);
  const [modalData, setModalData] = useState<NoticeInFindManyNoticeByAdminOutput>();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [take, setTake] = useState(10);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleClick = () => {
    setVisible(true);
    setIsEdit(false);
  };

  const handleRow = (record: NoticeInFindManyNoticeByAdminOutput) => {
    setVisible(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRefetch = () => {
    findManyNoticeByAdmin({
      variables: {
        take,
        skip: 0,
      },
      fetchPolicy: 'no-cache',
    });
    setVisible(false);
  };

  useEffect(() => {
    findManyNoticeByAdmin({
      variables: {
        take,
        skip,
      },
      fetchPolicy: 'no-cache',
    });
  }, [take, skip, visible]);

  const [findManyNoticeByAdmin, {}] = useLazyQuery<FindManyNoticeByAdminQuery>(
    FIND_MANY_NOTICE_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setNoticeData(data.findManyNoticeByAdmin.notices);
        setTotalCount(data.findManyNoticeByAdmin.totalCount);
      },
    },
  );

  return (
    <>
      <NoticeDetailModal
        partTitle="공지사항 분류"
        data={modalData}
        visible={visible}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
      />
      <Divider>공지사항</Divider>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          공지사항 등록
        </Button>
      </TransformBox>

      <Table
        columns={noticeColumns}
        dataSource={noticeData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: '30px',
        }}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
