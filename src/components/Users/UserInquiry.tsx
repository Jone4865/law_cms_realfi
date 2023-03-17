import { useLazyQuery } from '@apollo/client';
import { Form, Input, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import {
  FindManyUserInquiryByAdminOutput,
  UserInquiryInFindManyUserInquiryByAdminOutput,
} from '../../graphql/generated/graphql';
import { FIND_MANY_USER_INQUIRY_BY_ADMIN } from '../../graphql/query';
import { userDetailInquiryColumns } from '../../utils/columns';
import { InquiryDetailModal } from '../InquiryDetailModal';
import * as S from './style';

type Props = {
  email: string | undefined;
};

export function UserInquiry({ email }: Props) {
  const [userInquiryData, setUserInquiryData] =
    useState<FindManyUserInquiryByAdminOutput['userInquiries']>();
  const [modalData, setModalData] = useState<UserInquiryInFindManyUserInquiryByAdminOutput>();
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [modalView, setModalView] = useState(false);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const handleClickRow = (rec: UserInquiryInFindManyUserInquiryByAdminOutput) => {
    setModalData(rec);
    setModalView(true);
  };

  const handleCancel = () => {
    setModalView(false);
  };

  const handleRefetch = () => {
    setModalView(false);
  };

  const [findManyUserInquiryByAdmin] = useLazyQuery(FIND_MANY_USER_INQUIRY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyUserInquiryByAdmin.totalCount);
      setUserInquiryData(data.findManyUserInquiryByAdmin.userInquiries);
    },
  });

  useEffect(() => {
    findManyUserInquiryByAdmin({
      variables: {
        email: email ? email : '',
        searchText,
        skip,
        take,
      },
      fetchPolicy: 'no-cache',
    });
  }, [email, searchText, take, modalView]);

  return (
    <div>
      {modalView && (
        <InquiryDetailModal
          handleCancel={handleCancel}
          data={modalData}
          refetch={handleRefetch}
          visible={modalView}
        />
      )}
      <S.SubTitle>문의내역</S.SubTitle>
      <Form layout="inline">
        <Form.Item name="searchText">
          <Input.Search
            onSearch={(e) => {
              handleSearch(e);
            }}
            enterButton
            placeholder="검색어(문의내용)"
          />
        </Form.Item>
      </Form>
      <Table
        columns={userDetailInquiryColumns({})}
        dataSource={userInquiryData}
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
        scroll={{ x: 800 }}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
      />
    </div>
  );
}
