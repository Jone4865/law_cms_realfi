import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Input, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FindManyProjectDividendByAdminQuery } from '../../../graphql/generated/graphql';
import { PAY_DIVIDEND_BY_ADMIN, UPDATE_DIVIDEND_PERIOD_BY_ADMIN } from '../../../graphql/mutation';
import { FIND_MANY_DIVIDEND_ADMIN } from '../../../graphql/query';
import { FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN } from '../../../graphql/query/findManyProjectDividendByAdmin';
import { dividendmanagementColumns } from '../../../utils/columns';
import { DividendDetailModal } from '../../DividendDetailModal';
import { DividendListModal } from '../../DividendListModal';
import * as S from './style';

type Props = {
  projectId: number | undefined;
  publicOfferingQuantity: number | undefined;
  tabsName: string;
};

export function DividendManagement({ projectId = 0, publicOfferingQuantity, tabsName }: Props) {
  const [dividendData, setDividendData] = useState<
    FindManyProjectDividendByAdminQuery['findManyProjectDividendByAdmin']['projectDividends']
  >([]);
  const [dividendPeriod, setDividendPeriod] =
    useState<
      FindManyProjectDividendByAdminQuery['findManyProjectDividendByAdmin']['dividendPeriod']
    >('');
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [dividendListModalVisible, setDividendListModalVisible] = useState(false);
  const [projectDividendId, setProjectDividendId] = useState(0);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const onClickHandle = () => {
    updateDividendPeriodByAdmin({
      variables: {
        dividendPeriod: dividendPeriod ? dividendPeriod : '',
        id: projectId ? +projectId : 0,
      },
    });
  };

  const handleCancel = () => {
    setDetailModalVisible(false);
    setDividendListModalVisible(false);
    findManyProjectDividendByAdmin({
      variables: {
        projectId: +projectId && +projectId,
        skip,
        take,
      },
      fetchPolicy: 'no-cache',
    });
  };

  const handlePayClick = () => {
    payDividendByAdmin({
      variables: {
        id: projectDividendId,
      },
    });
  };

  const handlefindDividendListClick = () => {};

  const [findManyProjectDividendByAdmin] = useLazyQuery(FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setDividendPeriod(data.findManyProjectDividendByAdmin.dividendPeriod);
      setTotalCount(data.findManyProjectDividendByAdmin.totalCount);
      setDividendData(data.findManyProjectDividendByAdmin.projectDividends);
    },
  });

  const [updateDividendPeriodByAdmin] = useMutation(UPDATE_DIVIDEND_PERIOD_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '배당 주기를 수정하였습니다.' });
    },
  });

  const [payDividendByAdmin] = useMutation(PAY_DIVIDEND_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '배당금을 지급했습니다.' });
    },
  });

  useEffect(() => {
    findManyProjectDividendByAdmin({
      variables: {
        projectId: +projectId && +projectId,
        skip,
        take,
      },
      fetchPolicy: 'no-cache',
    });
  }, [projectId, skip]);

  return (
    <>
      <DividendDetailModal
        handleCancel={handleCancel}
        projectId={+projectId}
        visible={detailModalVisible}
        publicOfferingQuantity={publicOfferingQuantity}
      />
      <DividendListModal
        handleCancel={handleCancel}
        projectDividendId={projectDividendId}
        visible={dividendListModalVisible}
        tabsName={tabsName}
      />
      <S.Container>
        <S.DividendCycle>
          <S.Title>배당 주기</S.Title>
          <Input
            value={dividendPeriod ? dividendPeriod : ''}
            style={{ width: '50px', height: '30px', margin: '0 5px' }}
            onChange={(e) => setDividendPeriod(e.target.value)}
          />
          <span>달</span>
          <Button onClick={onClickHandle} type="primary" style={{ marginLeft: '10px' }}>
            저장
          </Button>
        </S.DividendCycle>
        <S.Wrap>
          <S.Title>배당정보</S.Title>
          <S.Btns>
            <Button onClick={() => setDetailModalVisible(true)} type="primary">
              등록하기
            </Button>
          </S.Btns>
        </S.Wrap>
        <Table
          columns={dividendmanagementColumns({ handlePayClick, handlefindDividendListClick })}
          dataSource={dividendData}
          // loading={loading}
          scroll={{ x: 800 }}
          style={{
            marginTop: '30px',
            width: '1300px',
          }}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: true,
            onChange: handlePagination,
            onShowSizeChange: (_current, size) => setTake(size),
            total: totalCount,
            current: current,
          }}
          onRow={(rec) => {
            return {
              onClick: () => {
                setProjectDividendId(rec.id);
                setDividendListModalVisible(true);
              },
            };
          }}
        />
      </S.Container>
    </>
  );
}
