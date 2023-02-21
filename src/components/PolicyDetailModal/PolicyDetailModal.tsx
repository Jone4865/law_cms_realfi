import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Switch, Checkbox } from 'antd';

import React, { useEffect, useState } from 'react';
import {
  CreatePolicyByAdminMutationVariables,
  FindPolicyQuery,
  FindPolicyQueryVariables,
  PolicyModel,
} from '../../graphql/generated/graphql';
import { CREATE_POLICY_BY_ADMIN } from '../../graphql/mutation';
import { FIND_POLICY } from '../../graphql/query';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  handleRefetch: () => void;
  policyKind: KindType[];
  policyId: number | undefined;
};

export function PolicyDetailModal({
  visible,
  handleCancel,
  isEdit,
  handleRefetch,
  policyKind,
  policyId,
}: Props) {
  const [content, setContent] = useState('');
  const [variables, setVariables] = useState<
    | CreatePolicyByAdminMutationVariables
    | { id: number; title: string; content: string; isRequired: boolean; createdAt: any }
  >();
  const options = [
    { label: '회원가입', value: 1 },
    { label: '비밀번호 초기화', value: 2 },
    { label: '투자정보 입력', value: 3 },
    { label: '투자자격 변경', value: 4 },
  ];

  const handleClick = () => {
    if (!isEdit) {
      createPolicyByAdmin({
        variables: {
          content,
          isRequired: variables?.isRequired ? variables?.isRequired : false,
          title: variables?.title ? variables?.title : '',
          policyCategoryIds: variables?.policyCategoryIds ? variables.policyCategoryIds : [],
        },
      });
    } else {
      // updatePolicy({
      //   variables: {
      //     ...variables,
      //     id: Number(data?.id ?? -1),
      //   },
      // });
    }
  };

  // update policy
  // const [updatePolicy] = useMutation<UpdatePolicyResponse, UpdatePolicyParams>(
  //   UPDATE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 수정했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

  // delete policy
  // const [deletePolicy] = useMutation<DeletePolicyResponse, DeletePolicyParams>(
  //   DELETE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 삭제했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //     variables: {
  //       id: data?.id ?? -1,
  //     },
  //   },
  // );

  const [findPolicy] = useLazyQuery(FIND_POLICY, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setVariables(data.findPolicy);
    },
  });

  const [createPolicyByAdmin] = useMutation(CREATE_POLICY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      notification.success({ message: '약관을 생성했습니다.' });
      handleRefetch();
    },
  });

  const handleChange = (key: string, value: any) => {
    setVariables((prev: any) => {
      let newData: any = { ...prev };
      newData[key] = value;
      return newData;
    });
  };

  useEffect(() => {
    if (policyId) {
      findPolicy({
        variables: {
          id: policyId,
        },
      });
    }
  }, [policyId]);

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={1000}
      closable={false}
      centered
      footer={
        <TransformBox justifyContent="flex-end">
          <Button onClick={handleCancel}>취소</Button>
          <>
            <Button type="primary" onClick={handleClick}>
              {isEdit ? '저장' : '등록'}
            </Button>
          </>
        </TransformBox>
      }
    >
      <h3>약관 제목</h3>
      <Input value={variables?.title} onChange={(e) => handleChange('title', e.target.value)} />
      <h3 style={{ marginTop: '15px' }}>분류</h3>
      <Checkbox.Group options={options} onChange={(e) => handleChange('policyCategoryIds', e)} />
      <TransformBox alignItems="center" marginTop="30px">
        <h3
          style={{
            margin: 'auto 0',
          }}
        >
          필수 여부
        </h3>
        <Switch
          style={{
            margin: '0 10px',
          }}
          checked={variables?.isRequired ? true : false}
          onChange={(e) => handleChange('isRequired', e)}
        />
      </TransformBox>
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <h3>약관 내용</h3>
        <Editor state={variables?.content ? variables?.content : ''} setState={setContent} />
      </TransformBox>
    </Modal>
  );
}
