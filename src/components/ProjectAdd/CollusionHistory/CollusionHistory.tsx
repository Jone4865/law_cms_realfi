import { useEffect, useState } from 'react';
import React, { useLazyQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import { Button, notification, Table } from 'antd';
import { FindManyPublicOfferingByAdminQuery } from '../../../graphql/generated/graphql';
import {
  REFUND_FAILED_PUBLIC_OFFERING_BY_ADMIN,
  REFUND_PUBLIC_OFFERING_BY_ADMIN,
} from '../../../graphql/mutation';
import { FIND_MANY_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/query';
import { collutionHistoryColumns } from '../../../utils/columns';
import { CollusionDetailModal } from '../../CollusionDetailModal';
import { RefundDoModal } from '../../RefundDoModal';

import * as S from './style';
import { AddDateModal } from '../../AddDateModal';

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
  const [addDateModalVisible, setAddDateModalVisible] = useState(false);
  const [all, setAll] = useState(false);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleModalCancel = () => {
    setDoModalVisible(false);
    setDetailModalVisible(false);
    setAddDateModalVisible(false);
  };

  const onClickHandle = (isAll: boolean) => {
    if (!isAll) {
      refundPublicOfferingByAdmin({
        variables: {
          projectId: projectId ? projectId : 0,
        },
      });
    } else {
    }
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
      notification.success({ message: '환불을 완료하였습니다.' });
    },
  });

  const [refundFailedPublicOfferingByAdmin] = useMutation(REFUND_FAILED_PUBLIC_OFFERING_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      notification.success({ message: '전체 환불을 완료하였습니다.' });
    },
  });

  useEffect(() => {
    findManyPublicOfferingByAdmin({
      variables: {
        cursorId,
        take,
        projectId: projectId ? projectId : 0,
      },
    });
  }, [skip]);

  return (
    <>
      <RefundDoModal
        projectId={projectId ? projectId : 0}
        handleCancel={handleModalCancel}
        visible={doModalvisible}
        onClickHandle={() => onClickHandle(all)}
        isAll={all}
      />
      <AddDateModal
        projectId={projectId ? projectId : 0}
        handleCancel={handleModalCancel}
        visible={addDateModalVisible}
        publicOfferingEndedAt={variables?.publicOfferingEndedAt}
      />
      <CollusionDetailModal
        handleCancel={handleModalCancel}
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
              <S.Bold>
                {variables.currentPublicOfferingAmount
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </S.Bold>
              <span>/</span>
              {variables?.totalPublicOfferingAmount
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div>
              <S.Bold>
                {variables.currentPublicOfferingQuantity
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </S.Bold>
              <span>/</span>
              {variables?.publicOfferingQuantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div>
              <S.Bold>{moment(variables.publicOfferingEndedAt).format('YYYY.MM.DD')}</S.Bold>
            </div>
            <div>
              <S.Bold>
                {variables.currentPublicOfferingQuantity /
                  (variables?.publicOfferingQuantity / 100) +
                  '%'}
              </S.Bold>
              <S.BtnWrap>
                <Button type="primary" onClick={() => setAddDateModalVisible(true)}>
                  공모 종료일 연장
                </Button>
              </S.BtnWrap>
            </div>
          </S.Right>
        </S.CollusionStates>
        <S.Wrap>
          <S.Title>공모내역</S.Title>
          <S.Btns>
            <Button style={{ marginRight: '10px' }} type="primary">
              알림톡 보내기
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              type="primary"
              onClick={() => {
                setAll(true);
                setDoModalVisible(true);
              }}
            >
              전체 환불
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setAll(false);
                setDoModalVisible(true);
              }}
            >
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
