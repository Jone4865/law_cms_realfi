import { useLazyQuery } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { FaqDetailModal } from '../../components/FaqDetailModal';
import TransformBox from '../../components/TransformBox';
import {
  FindManyFaqByAdminOutput,
  FindManyFaqByAdminQuery,
  FindManyFaqCategoryQuery,
} from '../../graphql/generated/graphql';
import { FIND_MANY_FAQ_BY_ADMIN, FIND_MANY_FAQ_CATEGORY } from '../../graphql/query';
import { FaqType, faqColumns } from '../../utils/columns';

export function Faq() {
  const [faqData, setFaqData] = useState<FindManyFaqByAdminOutput['faqs']>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState<FaqType>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [faqCategoryId, setFaqCategoryId] = useState(1);
  const [faqCategorys, setFaqCategorys] = useState<FindManyFaqCategoryQuery['findManyFaqCategory']>(
    [],
  );

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleClick = () => {
    setVisible(true);
    setIsEdit(false);
  };

  const handleRow = (record: FaqType) => {
    setVisible(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ searchText, skip, take })
    //     .then((data) => {
    //       setFaqData(data.data.seeFaqHistoryByAdmin.faqs);
    //       setTotalCount(data.data.seeFaqHistoryByAdmin.totalCount);
    //       if (
    //         data.data.seeFaqHistoryByAdmin.faqs.length === 0 &&
    //         data.data.seeFaqHistoryByAdmin.totalCount > 0
    //       ) {
    //         setSkip(skip - take);
    //       }
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  // faq 요청
  const [findManyFaqByAdmin, { loading }] = useLazyQuery<FindManyFaqByAdminQuery>(
    FIND_MANY_FAQ_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setFaqData(data.findManyFaqByAdmin.faqs);
        setTotalCount(data.findManyFaqByAdmin.totalCount);
      },
    },
  );

  // faq 카테고리 요청
  const [findManyFaqCategory, {}] = useLazyQuery(FIND_MANY_FAQ_CATEGORY, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setFaqCategorys(data.findManyFaqCategory);
    },
  });

  useEffect(() => {
    findManyFaqByAdmin({
      variables: {
        take,
        skip,
        searchText,
        faqCategoryId,
      },
      fetchPolicy: 'no-cache',
    });
    findManyFaqCategory({});
  }, [skip, take, faqCategoryId, visible]);

  return (
    <>
      <FaqDetailModal
        visible={visible}
        data={modalData}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
        faqCategory={faqCategorys}
      />
      <Divider>FAQ</Divider>
      {/* <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="검색어(질문)"
            onSearch={(e) => {
              handleSearch({
                searchText: e,
              });
            }}
          />
        </Form.Item>
      </Form> */}
      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          FAQ 등록
        </Button>
      </TransformBox>
      <Table
        columns={faqColumns({ faqCategorys })}
        dataSource={faqData}
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
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
