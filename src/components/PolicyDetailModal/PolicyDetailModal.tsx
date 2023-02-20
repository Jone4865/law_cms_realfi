import { useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Popconfirm, Select, Switch, Checkbox } from 'antd';

import React, { useEffect, useState } from 'react';
import { PolicyInFindManyPolicyOutput } from '../../graphql/generated/graphql';
import { PolicyType } from '../../utils/columns';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  data: PolicyInFindManyPolicyOutput | undefined;
  refetch: () => void;
  policyKind: KindType[];
};

export function PolicyDetailModal({
  visible,
  handleCancel,
  isEdit,
  data,
  refetch,
  policyKind,
}: Props) {
  const options = [
    { label: '회원가입', value: '회원가입' },
    { label: '비밀번호 초기화', value: '비밀번호 초기화' },
    { label: '투자정보 입력', value: '투자정보 입력' },
    { label: '투자자격 변경', value: '투자자격 변경' },
  ];

  const [content, setContent] = useState('');
  const [policyKindId, setPolicyKindId] = useState<number>(1);
  const [faqKindId, setFaqKindId] = useState(1);
  const [faqKind, setFaqKind] = useState([
    {
      id: 0,
      name: 'xawdwa',
    },
  ]);

  const handleClick = () => {
    if (!content.length) {
      return notification.error({ message: '약관 내용을 입력해주세요' });
    }
    const variables = {
      content,
      policyKindId,
    };
    if (!isEdit) {
      // createPolicy({
      //   variables: variables,
      // });
    } else {
      // updatePolicy({
      //   variables: {
      //     ...variables,
      //     id: Number(data?.id ?? -1),
      //   },
      // });
    }
  };

  // create policy
  // const [createPolicy] = useMutation<CreatePolicyResponse, CreatePolicyParams>(
  //   CREATE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 생성했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

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

  const handleChange = () => {};

  useEffect(() => {
    if (isEdit) {
      // setPolicyKindId(data?.policyKind.id ?? policyKind[0]?.id);
      // setContent(data?.content ?? '');
    } else {
      setPolicyKindId(policyKind[0]?.id);
      setContent('');
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
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
      <Input value={data && data.title} onChange={handleChange} />
      <h3 style={{ marginTop: '15px' }}>분류</h3>
      <Checkbox.Group options={options} onChange={handleChange} />
      <TransformBox alignItems="center" marginTop="30px">
        <h3
          style={{
            margin: 'auto 0',
          }}
        >
          필수 여부
        </h3>
        <Switch
          // checked={isFix}
          style={{
            margin: '0 10px',
          }}
          // onChange={setisFix}
        />
      </TransformBox>
      {/* {isEdit && (
        <TransformBox justifyContent="space-between">
          <h3>약관 종류</h3>
          <>
            <Popconfirm
              title="정말 삭제하시겠습니까?"
              okText="삭제"

              // onConfirm={() => deletePolicy()}
            >
              <Button type="primary" danger>
                삭제
              </Button>
            </Popconfirm>
          </>
        </TransformBox>
      )} */}
      {/* <Select
        value={policyKindId}
        style={{
          width: 150,
        }}
        onChange={setPolicyKindId}
      >
        {policyKind.map((v) => {
          return <Select.Option value={v.id}>{v.name}</Select.Option>;
        })}
      </Select> */}
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <h3>약관 내용</h3>
        <Editor state={content} setState={setContent} />
      </TransformBox>
    </Modal>
  );
}
