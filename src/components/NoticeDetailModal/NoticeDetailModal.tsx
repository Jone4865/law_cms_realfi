import { useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Popconfirm, Select } from 'antd';

import React, { useEffect, useState } from 'react';
import { NoticeInFindManyNoticeByAdminOutput, NoticeKind } from '../../graphql/generated/graphql';
import { CREATE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../graphql/mutation';
import { noticeKindToText } from '../../utils/noticeKindToText';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  data: NoticeInFindManyNoticeByAdminOutput | undefined;
  refetch: () => void;
  partTitle?: string;
};

export function NoticeDetailModal({
  visible,
  handleCancel,
  isEdit,
  data,
  refetch,
  partTitle,
}: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(' ');
  const [isFix, setisFix] = useState(false);
  const [noticeKindId, setNoticeKindId] = useState(data?.noticeKind);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleClick = () => {
    if (!title.length) {
      return notification.error({ message: '공지사항 제목을 입력해주세요.' });
    }
    if (!content.length) {
      return notification.error({ message: '공지사항 내용을 입력해주세요.' });
    }
    if (!noticeKindId) {
      return notification.error({ message: '공지사항 분류를 선택해주세요.' });
    }

    if (!isEdit) {
      createNoticeByAdmin({
        variables: {
          title,
          noticeKind: noticeKindId,
          content,
        },
      });
    }

    if (isEdit && data) {
      updateNoticeByAdmin({
        variables: {
          id: data.id,
          content,
          noticeKind: noticeKindId,
          title,
        },
      });
    }
  };

  const handleDelete = () => {
    // deleteNotice({
    //   variables: {
    //     id: data?.id ?? -1,
    //   },
    // });
  };

  const [createNoticeByAdmin, {}] = useMutation(CREATE_NOTICE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
      handleCancel();
      refetch();
    },
    onCompleted: (data) => {
      notification.success({ message: '공지사항을 등록했습니다.' });
      refetch();
    },
  });

  const [updateNoticeByAdmin, {}] = useMutation(UPDATE_NOTICE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
      handleCancel();
      refetch();
    },
    onCompleted: (data) => {
      notification.success({ message: '수정을 완료했습니다.' });
      refetch();
    },
  });

  // delete notice
  // const [deleteNotice] = useMutation<DeleteNoticeResponse, DeleteNoticeParams>(
  //   DELETE_NOTICE,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '공지사항을 삭제했습니다' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

  useEffect(() => {
    if (isEdit) {
      setTitle(data?.title ?? '');
      setContent(data?.content ?? ' ');
      // setisFix(data?.isFix ?? false);
    } else {
      setTitle('');
      setContent(' ');
      setisFix(false);
    }
  }, [visible]);

  useEffect(() => {
    setNoticeKindId(data?.noticeKind);
  }, [data]);

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

          <Button type="primary" onClick={handleClick}>
            {isEdit ? '저장' : '등록'}
          </Button>
        </TransformBox>
      }
    >
      <TransformBox alignItems="center" justifyContent="space-between" marginBottom="10px">
        <>
          <h3>제목</h3>
          {isEdit && (
            <TransformBox>
              <Popconfirm title="삭제하시겠습니까?" okText="삭제" onConfirm={handleDelete}>
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            </TransformBox>
          )}
        </>
      </TransformBox>
      <Input value={title} onChange={handleChange} />
      <TransformBox alignItems="center" justifyContent="space-between" marginTop="30px">
        <h3>{partTitle}</h3>
      </TransformBox>
      <Select
        onChange={setNoticeKindId}
        value={noticeKindId}
        style={{
          width: '100%',
        }}
      >
        {Object.values(NoticeKind).map((v) => {
          return (
            <Select.Option key={v} value={v}>
              {noticeKindToText(v)}
            </Select.Option>
          );
        })}
      </Select>
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <TransformBox justifyContent="space-between" alignItems="center">
          <h3>내용</h3>
          {/* <TransformBox>
            <span>고정</span>
            <Switch
              checked={isFix}
              style={{
                margin: '0 10px',
              }}
              onChange={setisFix}
            />
          </TransformBox> */}
        </TransformBox>
        <Editor state={content} setState={setContent} />
      </TransformBox>
    </Modal>
  );
}
