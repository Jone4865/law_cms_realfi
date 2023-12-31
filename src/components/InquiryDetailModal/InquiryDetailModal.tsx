import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, notification } from 'antd';
import TransformBox from '../TransformBox';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { UserInquiryInFindManyUserInquiryByAdminOutput } from '../../graphql/generated/graphql';
import { REPLY_USER_INQUIRY_BY_ADMIN } from '../../graphql/mutation';
import * as S from './style';

type Props = {
  visible: boolean;
  data: UserInquiryInFindManyUserInquiryByAdminOutput | undefined;
  refetch: () => void;
  handleCancel: () => void;
};

export function InquiryDetailModal({ visible, handleCancel, data, refetch }: Props) {
  const [reply, setReply] = useState('');

  const handleReply = () => {
    if (data?.reply) {
      return handleCancel();
    }
    if (!reply.length) {
      return notification.error({ message: '답변을 입력해주세요.' });
    }
    replyUserInquiryByAdmin({
      variables: {
        id: Number(data?.id ?? 0),
        reply,
      },
      fetchPolicy: 'no-cache',
    });
    refetch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const [replyUserInquiryByAdmin, {}] = useMutation(REPLY_USER_INQUIRY_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      refetch();
      notification.success({ message: '답변을 등록하였습니다.' });
    },
  });

  useEffect(() => {
    if (data?.reply) {
      setReply(data.reply);
    } else {
      setReply('');
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={false}
      centered
      width={1000}
      title="1:1 문의"
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <S.Wrap>
        <>문의 날짜 </>
        <S.Label>{moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</S.Label>
      </S.Wrap>
      <S.Wrap>
        <>문의자 </>
        <S.Label>ddd{data?.user?.name}</S.Label>
      </S.Wrap>

      <>문의제목</>
      <Input.TextArea
        value={data?.title}
        readOnly
        style={{
          marginBottom: 20,
          height: 50,
          resize: 'none',
        }}
      />

      <>문의내용</>
      <Input.TextArea
        value={data?.content}
        readOnly
        style={{
          marginBottom: 20,
          height: 100,
          resize: 'none',
        }}
      />

      <>문의답변</>
      <Input.TextArea
        value={reply}
        readOnly={(data?.reply?.length ?? -1) > 0}
        style={{
          height: 100,
          resize: 'none',
        }}
        onChange={handleChange}
      />

      <TransformBox justifyContent="center" marginTop="30px">
        {/* <Button
          style={{
            width: 150,
            backgroundColor: '#ff4d4f',
            color: 'white',
          }}
        >
          삭제
        </Button> */}
        <Button
          type="primary"
          style={{
            width: 150,
            marginLeft: '10px',
          }}
          onClick={handleReply}
        >
          {data?.reply ? '확인' : '답변 작성'}
        </Button>
      </TransformBox>
    </Modal>
  );
}
