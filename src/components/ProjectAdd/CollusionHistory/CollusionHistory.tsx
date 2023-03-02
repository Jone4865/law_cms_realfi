import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, notification, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FindManyPublicOfferingByAdminQuery } from '../../../graphql/generated/graphql';
import { REFUND_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/mutation';
import { FIND_MANY_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/query';
import { collutionHistoryColumns } from '../../../utils/columns';
import { RefundDetailModal } from '../../RefundDetailModal';
import { RefundDoModal } from '../../RefundDoModal';

import * as S from './style';

type Props = {
  projectId: number | undefined | '';
  variables: any;
};

export function CollusionHistory({ projectId, variables }: Props) {
  const [collutionHistoryData, setCollutionHistoryData] =
    useState<
      FindManyPublicOfferingByAdminQuery['findManyPublicOfferingByAdmin']['publicOfferings']
    >();
  const [publicOfferingId, setPublicOfferingId] = useState<number>(0);
  const [publicOfferingState, setPublicOfferingState] = useState<string>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [cursorId, setCursorId] = useState(0);
  const [doModalvisible, setDoModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    findManyPublicOfferingByAdmin({
      variables: {
        cursorId,
        take,
        projectId: projectId ? projectId : 0,
      },
    });
  }, [skip]);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleDoModalCancel = () => {
    setDoModalVisible(false);
  };

  const handleDetailModalCancel = () => {
    setDetailModalVisible(false);
  };

  const onClickHandle = () => {
    refundPublicOfferingByAdmin({
      variables: {
        projectId: projectId ? projectId : 0,
      },
    });
  };

  const [findManyPublicOfferingByAdmin] = useLazyQuery(FIND_MANY_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyPublicOfferingByAdmin.totalCount);
      setCollutionHistoryData(data.findManyPublicOfferingByAdmin.publicOfferings);
    },
  });

  const [refundPublicOfferingByAdmin] = useMutation(REFUND_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '환불을 진행하였습니다.' });
    },
  });

  return (
    <>
      <RefundDoModal
        projectId={projectId ? projectId : 0}
        handleCancel={handleDoModalCancel}
        visible={doModalvisible}
        onClickHandle={onClickHandle}
      />
      <RefundDetailModal
        handleCancel={handleDetailModalCancel}
        visible={detailModalVisible}
        publicOfferingId={publicOfferingId}
        publicOfferingState={publicOfferingState}
      />
      <S.Container>
        <S.Title>공모 진행 현황</S.Title>
        <S.CollusionStates>
          <S.Left>
            <div>공모 금액 현황</div>
            <div>공모 수량 현황</div>
            <div>공모 종료일</div>
            <div>공모 공모 진행율</div>
          </S.Left>
          <S.Right>
            <div>
              {variables.currentPublicOfferingAmount
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                ' / ' +
                variables?.totalPublicOfferingAmount
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div>
              {variables.currentPublicOfferingQuantity
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                ' / ' +
                variables?.publicOfferingQuantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div>
              {(variables.dDay != null ? variables.dDay + ' / ' : '') +
                moment(variables.publicOfferingEndedAt).format('YYYY.MM.DD')}
            </div>
            <div>
              {variables.currentPublicOfferingQuantity / (variables?.publicOfferingQuantity / 100) +
                '%'}
            </div>
          </S.Right>
        </S.CollusionStates>
        <S.Wrap>
          <S.Title>공모내역</S.Title>
          <S.Btns>
            <Button style={{ marginRight: '10px' }} type="primary">
              알림톡 보내기
            </Button>
            <Button type="primary" onClick={() => setDoModalVisible(true)}>
              환불
            </Button>
          </S.Btns>
        </S.Wrap>
        <Table
          columns={collutionHistoryColumns({})}
          dataSource={collutionHistoryData}
          onRow={(rec) => {
            return {
              onClick: () => {
                setPublicOfferingId(rec.id);
                setDetailModalVisible(true);
                setPublicOfferingState(rec.status);
              },
            };
          }}
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
        />
      </S.Container>
    </>
  );
}
