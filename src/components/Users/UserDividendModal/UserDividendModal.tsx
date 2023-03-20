import { useLazyQuery } from '@apollo/client';
import { Modal, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FindManyDividendInUserByAdminOutput } from '../../../graphql/generated/graphql';
import { FIND_MANY_DIVIDEND_IN_USER_BY_ADMIN } from '../../../graphql/query';
import { userDividendClumns } from '../../../utils/columns';
import * as S from './../style';

type Props = {
  visible: boolean;
  projectId: number;
  email: string;
  handleCancel: () => void;
};

export function UserDividendModal({ visible, projectId, email, handleCancel }: Props) {
  const [userDividendData, setUserDividendData] = useState<FindManyDividendInUserByAdminOutput>();
  const [userDividendModalData, setUserDividendModalData] =
    useState<FindManyDividendInUserByAdminOutput['dividends']>();
  const [totalCount, setTotalCount] = useState(0);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const [findManyDividendInUserByAdmin] = useLazyQuery(FIND_MANY_DIVIDEND_IN_USER_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyDividendInUserByAdmin.totalCount);
      setUserDividendData(data.findManyDividendInUserByAdmin);
      setUserDividendModalData(data.findManyDividendInUserByAdmin.dividends);
    },
  });

  useEffect(() => {
    findManyDividendInUserByAdmin({
      variables: {
        email: email,
        projectId: projectId,
        skip,
        take,
      },
    });
  }, [projectId, take]);

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={false}
      title={`배당내역`}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
      centered
      width={1000}
    >
      <div>
        <S.Flex>
          <S.DividendBox>프로젝트 명</S.DividendBox>
          <S.DividendBoxRight>{userDividendData?.project.name}</S.DividendBoxRight>
        </S.Flex>
        <S.Flex>
          <S.DividendBox>총 배당금</S.DividendBox>
          <S.DividendBoxRight>
            {userDividendData?.sum === 'null' ? 0 : userDividendData?.sum}
          </S.DividendBoxRight>
        </S.Flex>
      </div>
      <Table
        columns={userDividendClumns({})}
        dataSource={userDividendModalData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: 30,
        }}
        scroll={{ x: 800 }}
      />
    </Modal>
  );
}
