import { Button, Divider, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { PolicyDetailModal } from '../../components/PolicyDetailModal';
import TransformBox from '../../components/TransformBox';
import { policyColumns } from '../../utils/columns';
import { FIND_MANY_POLICY_BY_ADMIN, FIND_POLICY } from '../../graphql/query';
import {
  FindManyPolicyByAdminQuery,
  PolicyInFindManyPolicyByAdminOutput,
  PolicyInFindManyPolicyOutput,
  PolicyModel,
} from '../../graphql/generated/graphql';

export function Policy() {
  const [policyData, setPolicyData] = useState<PolicyInFindManyPolicyByAdminOutput[]>([]);
  const [policyKind, setPolicyKind] = useState<KindType[]>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [policyId, setPolicyId] = useState(0);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleClick = () => {
    setVisible(true);
    setIsEdit(false);
  };

  const handleRow = (record: PolicyInFindManyPolicyOutput) => {
    setPolicyId(record.id);
    setVisible(true);
    setIsEdit(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRefetch = () => {
    setVisible(false);
  };

  const [findManyPolicyByAdmin] = useLazyQuery<FindManyPolicyByAdminQuery>(
    FIND_MANY_POLICY_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setTotalCount(data.findManyPolicyByAdmin.totalCount);
        setPolicyData(data.findManyPolicyByAdmin.policies);
      },
    },
  );

  useEffect(() => {
    findManyPolicyByAdmin({
      variables: {
        take,
        skip,
      },
    });
  }, []);

  return (
    <>
      <PolicyDetailModal
        handleCancel={handleCancel}
        visible={visible}
        isEdit={isEdit}
        handleRefetch={handleRefetch}
        policyKind={policyKind}
        policyId={policyId}
      />
      <Divider>약관 관리</Divider>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          약관 등록
        </Button>
      </TransformBox>

      <Table
        columns={policyColumns}
        dataSource={policyData}
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
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
        style={{
          marginTop: '30px',
        }}
      />
    </>
  );
}
