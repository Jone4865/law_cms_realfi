import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Switch, Checkbox, Popconfirm } from 'antd';

import React, { useEffect, useState } from 'react';
import {
  CREATE_POLICY_BY_ADMIN,
  DELETE_POLICY_BY_ADMIN,
  UPDATE_POLICY_BY_ADMIN,
  UPLOAD_POLICY_FILE_BY_ADMIN,
} from '../../graphql/mutation';
import { FIND_POLICY } from '../../graphql/query';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  visible: boolean;
  isEdit: boolean;
  policyData: any;
  policyId: number;
  handleRefetch: () => void;
  handleCancel: () => void;
};

export function PolicyDetailModal({
  visible,
  isEdit,
  policyData,
  policyId,
  handleRefetch,
  handleCancel,
}: Props) {
  const [content, setContent] = useState('');
  const [variables, setVariables] = useState<any>([]);
  const [checkBoxDefaultVlaue, setCheckBoxDefaultVlaue] = useState<string[]>([]);
  const options = ['회원가입', '비밀번호 초기화', '투자정보 입력', '투자자격 변경'];

  const handleClick = () => {
    const categorys = options.map((option, idx) =>
      checkBoxDefaultVlaue.includes(option) ? idx + 1 : 0,
    );
    const policyCategoryIds = categorys.filter((v) => v !== 0);
    if (content.length === 0) {
      return notification.error({ message: '내용을 입력해주세요.' });
    }
    if (variables?.title.length === 0) {
      return notification.error({ message: '제목을 입력해주세요.' });
    }
    if (policyCategoryIds.length === 0) {
      return notification.error({ message: '분류를 선택해주세요.' });
    }

    if (!isEdit) {
      createPolicyByAdmin({
        variables: {
          content,
          isRequired: variables?.isRequired ? variables?.isRequired : false,
          title: variables?.title ? variables?.title : '',
          policyCategoryIds,
        },
        fetchPolicy: 'no-cache',
      });
    } else {
      updatePolicyByAdmin({
        variables: {
          id: policyId,
          content,
          isRequired: variables?.isRequired ? variables?.isRequired : false,
          title: variables?.title ? variables?.title : '',
          policyCategoryIds,
        },
        fetchPolicy: 'no-cache',
      });
      handleRefetch();
    }
  };

  const handleChangeContent = (value: string) => {
    setContent(value);
  };

  const handleChange = (key: string, value: any) => {
    setVariables((prev: any) => {
      let newData: any = { ...prev };
      newData[key] = value;
      return newData;
    });
  };
  const handleChangeCategorys = (e: any) => {
    setCheckBoxDefaultVlaue(e);
  };

  const handleDelete = () => {
    deletePolicyByAdmin({ variables: { id: policyId } });
    handleRefetch();
  };

  const [findPolicy] = useLazyQuery(FIND_POLICY, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setContent(data.findPolicy.content);
    },
  });

  const [createPolicyByAdmin] = useMutation(CREATE_POLICY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: () => {
      notification.success({ message: '약관을 생성했습니다.' });
      handleRefetch();
    },
  });

  const [updatePolicyByAdmin] = useMutation(UPDATE_POLICY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '답변을 수정했습니다.' });
      handleRefetch();
    },
  });

  const [deletePolicyByAdmin] = useMutation(DELETE_POLICY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '삭제를 완료했습니다.' });
      handleRefetch();
    },
  });

  useEffect(() => {
    if (isEdit) {
      setVariables(policyData[0]);
      setCheckBoxDefaultVlaue(policyData[0]?.policyCategories.map((v: { name: string }) => v.name));
      findPolicy({
        variables: {
          id: policyId,
        },
        fetchPolicy: 'no-cache',
      });
    } else {
      setVariables(undefined);
      setCheckBoxDefaultVlaue([]);
      setContent('');
    }
  }, [visible]);

  useEffect(() => {
    handleChange('content', content);
  }, [content]);

  // const handleUploadImage = (file: File, cb: (url: string) => void) => {
  //   uploadPolicyFile({
  //     variables: {
  //       file: file,
  //     },
  //     onCompleted: (res) => {
  //       console.log(res.uploadPolicyFileByAdmin);
  //       cb(`${process.env.REACT_APP_SERVER_BASIC}/policy/file?name=${res.uploadPolicyFileByAdmin}`);
  //     },
  //   });
  // };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={1000}
      closable={false}
      centered
      footer={
        <TransformBox justifyContent="flex-end">
          <>
            {!isEdit ? (
              <Button onClick={() => handleCancel()}>취소</Button>
            ) : (
              <Popconfirm title="삭제하시겠습니까?" okText="삭제" onConfirm={handleDelete}>
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            )}
          </>
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
      <Checkbox.Group
        value={checkBoxDefaultVlaue}
        options={options}
        onChange={(e) => handleChangeCategorys(e)}
      />
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
        <Editor
          state={content}
          onChange={handleChangeContent}
          // onUpload={handleUploadImage}
        />
      </TransformBox>
    </Modal>
  );
}
