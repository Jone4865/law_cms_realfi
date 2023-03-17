import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, notification, Popconfirm, Select } from 'antd';
import TransformBox from '../TransformBox';
import { useMutation } from '@apollo/client';
import { CREATE_FAQ_BY_ADMIN, UPDATE_FAQ_BY_ADMIN } from '../../graphql/mutation';
import { FindManyFaqCategoryQuery } from '../../graphql/generated/graphql';
import { FaqType } from '../../utils/columns';
import { Editor } from '../Editor';

type Props = {
  visible: boolean;
  isEdit: boolean;
  data: FaqType | undefined;
  faqCategory: FindManyFaqCategoryQuery['findManyFaqCategory'];
  refetch: () => void;
  handleCancel: () => void;
};

export function FaqDetailModal({
  visible,
  isEdit,
  data,
  faqCategory,
  refetch,
  handleCancel,
}: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [faqCategoryId, setFaqCategoryId] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (!question.length) {
      return notification.error({ message: 'FAQ 질문을 입력해주세요' });
    }
    if (!answer.length) {
      return notification.error({ message: 'FAQ 답변을 입력해주세요' });
    }
    const variables = {
      question,
      answer,
      faqCategoryId: 1,
    };
    if (!isEdit) {
      createFaqByAdmin({
        variables,
      });
    } else {
      updateFaqByAdmin({
        variables: {
          ...variables,
          id: data?.id ?? -1,
        },
      });
    }
  };

  const handleDelete = () => {
    // deleteFaq({
    //   variables: {
    //     id: data?.id ?? 0,
    //   },
    // });
  };

  const [updateFaqByAdmin] = useMutation(UPDATE_FAQ_BY_ADMIN, {
    onCompleted: (data) => {
      notification.success({ message: '수정을 완료했습니다.' });
      handleCancel();
      refetch();
    },
    onError: (e) => {
      notification.error({ message: e.message });
    },
  });

  const [createFaqByAdmin] = useMutation(CREATE_FAQ_BY_ADMIN, {
    onCompleted: (data) => {
      notification.success({ message: 'FAQ를 생성했습니다.' });
      handleCancel();
      refetch();
    },
    onError: (e) => {
      notification.error({ message: e.message });
    },
  });

  useEffect(() => {
    if (isEdit) {
      setQuestion(data?.question ?? '');
      setAnswer(data?.answer ?? '');
      setFaqCategoryId(data?.faqCategory.id ?? faqCategory[0]?.id);
    } else {
      setQuestion('');
      setAnswer('');
      setFaqCategoryId(faqCategory[0]?.id);
    }
  }, [visible]);

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

          <Button type="primary" onClick={handleSubmit}>
            {isEdit ? '저장' : '등록'}
          </Button>
        </TransformBox>
      }
    >
      <TransformBox alignItems="center" justifyContent="space-between">
        <>
          <h3>FAQ 종류</h3>
          {isEdit && (
            <TransformBox>
              <Popconfirm title="삭제하시겠습니까?" okText="삭제" onConfirm={handleDelete}>
                <Button type="primary" danger style={{ marginBottom: '10px' }}>
                  삭제
                </Button>
              </Popconfirm>
            </TransformBox>
          )}
        </>
      </TransformBox>
      <Select
        onChange={setFaqCategoryId}
        value={faqCategoryId}
        style={{
          width: '100%',
        }}
      >
        {faqCategory.map((v: any) => {
          return (
            <Select.Option key={v} value={v.id}>
              {v.name}
            </Select.Option>
          );
        })}
      </Select>
      <TransformBox alignItems="center" justifyContent="space-between" marginTop="30px">
        <h3>질문</h3>
      </TransformBox>
      <Input value={question} onChange={handleChange} />
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <h3>답변</h3>
        <Editor state={answer} setState={setAnswer} />
      </TransformBox>
    </Modal>
  );
}
