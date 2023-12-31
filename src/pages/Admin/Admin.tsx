import { Button, Divider, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import * as S from './style';

import { AdminDetailModal } from '../../components/AdminDetailModal';
import { OtpInputModal } from '../../components/OtpInputModal';
import { OtpQrModal } from '../../components/OtpQrModal';
import TransformBox from '../../components/TransformBox';
import { AuthDescType, authDescColumns } from '../../utils/columns';
import { AdminType } from '../../utils/columns/admin';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FIND_MANY_ADMIN_BY_ADMIN } from '../../graphql/query';
import { AdminInFindManyAdminByAdminOutput } from '../../graphql/generated/graphql';
import { DELETE_OTP_SECRET_BY_ADMIN } from '../../graphql/mutation';

export function Admin() {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<AdminInFindManyAdminByAdminOutput>();
  const [adminData, setAdminData] = useState<AdminInFindManyAdminByAdminOutput[]>([]);
  const [adminAuths, setAdminAuths] = useState<KindType[]>([]);
  const [secret, setSecret] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);

  const [authDescData, setAuthDescData] = useState<AuthDescType[]>([
    {
      name: 'MASTER',
      desc: '마스터',
    },
    {
      name: 'READ_ADMIN',
      desc: '관리자 조회',
    },
    {
      name: 'WRITE_ADMIN',
      desc: '관리자 수정',
    },
    {
      name: 'READ_USER',
      desc: '유저 조회',
    },
    {
      name: 'WRITE_USER',
      desc: '유저 수정',
    },
    {
      name: 'READ_PROJECT',
      desc: '프로젝트 조회',
    },
    {
      name: 'WRITE_PROJECT',
      desc: '프로젝트 수정',
    },
  ]);

  const columns: ColumnsType<AdminInFindManyAdminByAdminOutput> = [
    {
      title: 'no',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: '이메일',
      key: 'email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '이름',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '권한',
      key: 'adminRoles',
      dataIndex: 'adminRoles',
      render: (val) => {
        return (
          <TransformBox alignItems="center" flexDirection="column">
            {val?.map((v: AdminType) => {
              return <div key={v.id}>{v.name}</div>;
            })}
          </TransformBox>
        );
      },
      align: 'center',
    },
    {
      title: 'OTP 설정',
      key: 'OTP',
      dataIndex: 'otpSecret',
      render: (val, record) => {
        return (
          <S.OtpWrap>
            {val?.length ? (
              <Tag
                color="red"
                style={{
                  margin: 0,
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickDeleteOtp(record.email);
                }}
              >
                삭제
              </Tag>
            ) : (
              <Tag
                style={{
                  margin: 0,
                }}
              >
                미등록
              </Tag>
            )}
          </S.OtpWrap>
        );
      },
      align: 'center',
    },
    {
      title: '생성일',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD hh:mm');
      },
      align: 'center',
    },
  ];

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const [authDeskArr, setAuthDeskArr] = useState<string[]>([]);

  const handleCheckBox = (val: string) => {
    if (authDeskArr.includes(val)) {
      const newArr = authDeskArr.filter((data) => data !== val);
      return setAuthDeskArr(newArr);
    } else {
      return setAuthDeskArr([...authDeskArr, val]);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
    setModalData(undefined);
  };

  const handleRow = (record: AdminInFindManyAdminByAdminOutput) => {
    setVisible(true);
    setModalData(record);
  };

  const handleCancelOtp = () => {
    setOtpModalVisible(false);
  };

  const handleCancelQr = () => {
    setQrModalVisible(false);
  };

  const handleNext = () => {
    handleCancelQr();
    setOtpModalVisible(true);
  };

  const handleFinish = (otp: string[]) => {};

  const handleRefetch = () => {
    setVisible(false);
    setModalData(undefined);
    findManyAdminByAdmin({
      variables: {
        take,
        skip,
      },
      fetchPolicy: 'no-cache',
    });
  };

  const onClickDeleteOtp = (email: string) => {
    deleteOtpSecretByAdmin({ variables: { email } });
  };

  useEffect(() => {
    findManyAdminByAdmin({
      variables: {
        take,
        skip,
      },
      fetchPolicy: 'no-cache',
    });
  }, [visible, visible]);

  const [findManyAdminByAdmin] = useLazyQuery(FIND_MANY_ADMIN_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setAdminData(data.findManyAdminByAdmin.admins);
    },
  });

  const [deleteOtpSecretByAdmin] = useMutation(DELETE_OTP_SECRET_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: 'OTP를 삭제했습니다.' });
      handleRefetch();
    },
  });

  return (
    <>
      <AdminDetailModal
        visible={visible}
        handleCancel={handleCancel}
        admin={modalData}
        refetch={handleRefetch}
        adminRoles={adminAuths}
      />
      <OtpQrModal
        visible={qrModalVisible}
        handleCancel={handleCancelQr}
        handleNext={handleNext}
        otpSecret={secret}
      />
      <OtpInputModal
        loading={false}
        visible={otpModalVisible}
        onCancel={handleCancelOtp}
        handleFinish={handleFinish}
      />
      <Divider>관리자 계정</Divider>

      <TransformBox justifyContent="flex-end" marginBottom={'30px'}>
        <Button type="primary" onClick={handleClick}>
          관리자 생성
        </Button>
      </TransformBox>

      <Table
        columns={columns}
        dataSource={adminData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        rowKey={(rec) => rec.email}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginBottom: 30,
        }}
        scroll={{ x: 1000 }}
      />
      <h3>권한 설명</h3>
      <Table
        columns={authDescColumns}
        dataSource={authDescData}
        pagination={false}
        rowKey={(rec) => rec.name}
        scroll={{ x: 800 }}
      />
    </>
  );
}
