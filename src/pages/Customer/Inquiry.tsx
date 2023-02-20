import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { InquiryDetailModal } from '../../components/InquiryDetailModal';
import { UserDetailModal } from '../../components/UserDetailModal';
import {
  FindManyUserInquiryByAdminQuery,
  FindManyUserInquiryCategoryQuery,
  UserInquiryInFindManyUserInquiryByAdminOutput,
} from '../../graphql/generated/graphql';
import {
  FIND_MANY_USER_INQUIRY_BY_ADMIN,
  FIND_MANY_USER_INQUIRY_CATEGORY,
} from '../../graphql/query';
import { inquiryColumns } from '../../utils/columns/customer.inquiry';

export function Inquiry() {
  const [visible, setVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [modalData, setModalData] = useState<UserInquiryInFindManyUserInquiryByAdminOutput>();
  const [inquiryData, setInquiryData] = useState<UserInquiryInFindManyUserInquiryByAdminOutput[]>(
    [],
  );
  const [inquiryCategorys, setInquiryCategorys] = useState<
    FindManyUserInquiryCategoryQuery['findManyUserInquiryCategory']
  >([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [userInquiryCategoryId, setUserInquiryCategoryId] = useState<number | null>(1);
  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleRow = (data: UserInquiryInFindManyUserInquiryByAdminOutput) => {
    setDetailModalVisible(true);
    setModalData(data);
  };

  const handleCancelDetail = () => {
    setDetailModalVisible(false);
  };
  const handleCanceluserDetail = () => {};
  const handleSearch = (values: { searchText?: string }) => {
    findManyUserInquiryByAdmin({
      variables: {
        take,
        skip,
        searchText,
        userInquiryCategoryId,
      },
      fetchPolicy: 'no-cache',
    });
    setCurrent(1);
    setSkip(0);
    setSearchText(values.searchText ?? '');
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ take, skip })
    //     .then((data) => {
    //       setInquiryData(data.data.seeAllInquiryHistoryByAdmin.inquiries);
    //       setTotalCount(data.data.seeAllInquiryHistoryByAdmin.totalCount);
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
    findManyUserInquiryByAdmin({
      variables: {
        take,
        skip,
        searchText,
        userInquiryCategoryId,
      },
      fetchPolicy: 'no-cache',
    });
    setDetailModalVisible(false);
  };

  const [findManyUserInquiryCategory, { loading }] = useLazyQuery(FIND_MANY_USER_INQUIRY_CATEGORY, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setInquiryCategorys(data.findManyUserInquiryCategory);
    },
  });

  const [findManyUserInquiryByAdmin, {}] = useLazyQuery<FindManyUserInquiryByAdminQuery>(
    FIND_MANY_USER_INQUIRY_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setInquiryData(data.findManyUserInquiryByAdmin.userInquiries);
        setTotalCount(data.findManyUserInquiryByAdmin.totalCount);
      },
    },
  );

  useEffect(() => {
    findManyUserInquiryCategory({});
    findManyUserInquiryByAdmin({
      variables: {
        take,
        skip,
        searchText,
        userInquiryCategoryId,
      },
      fetchPolicy: 'no-cache',
    });
  }, [skip, take, userInquiryCategoryId, visible, searchText]);

  return (
    <>
      <UserDetailModal email="" handleCancel={handleCanceluserDetail} visible={visible} />
      <InquiryDetailModal
        data={modalData}
        visible={detailModalVisible}
        handleCancel={handleCancelDetail}
        refetch={handleRefetch}
      />
      <Divider>1:1 문의</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            onSearch={(e) => {
              handleSearch({ searchText: e });
            }}
            enterButton
            placeholder="검색어(문의내용, 닉네임)"
          />
        </Form.Item>
      </Form>
      <Table
        columns={inquiryColumns({ setVisible, inquiryCategorys })}
        dataSource={inquiryData}
        onChange={(v, filter) => {
          setUserInquiryCategoryId(
            filter && filter.userInquiryCategory ? +filter.userInquiryCategory[0] : null,
          );
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
          marginTop: 30,
        }}
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
        scroll={{ x: 800 }}
      />
    </>
  );
}
