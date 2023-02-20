import { useLazyQuery } from '@apollo/client';
import { Button, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { PublicOfferingInFindManyPublicOfferingByAdminOutput } from '../../../graphql/generated/graphql';
import { FIND_MANY_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/query';
import { collutionHistoryColumns } from '../../../utils/columns';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
};

export function CollusionHistory({ projectId }: Props) {
  const [collutionHistoryData, setCollutionHistoryData] = useState<
    PublicOfferingInFindManyPublicOfferingByAdminOutput[]
  >([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [cursorId, setCursorId] = useState(0);

  useEffect(() => {
    findManyPublicOfferingByAdmin({
      variables: {
        cursorId,
        take,
        projectId: projectId ? projectId : 0,
      },
    });
  }, []);

  const handlePagination = () => {};

  const [findManyPublicOfferingByAdmin, { loading }] = useLazyQuery(
    FIND_MANY_PUBLIC_OFFERING_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setTotalCount(data.findManyPublicOfferingByAdmin.totalCount);
        setCollutionHistoryData(data.findManyPublicOfferingByAdmin.publicOfferings);
      },
    },
  );

  return (
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
          <div>공모 금액 현황</div>
          <div>공모 금액 현황</div>
          <div>공모 금액 현황</div>
          <div>공모 금액 현황</div>
        </S.Right>
      </S.CollusionStates>
      <S.Wrap>
        <S.Title>공모내역</S.Title>
        <S.Btns>
          <Button style={{ marginRight: '10px' }} type="primary">
            알림톡 보내기
          </Button>
          <Button type="primary">환불</Button>
        </S.Btns>
      </S.Wrap>
      <Table
        columns={collutionHistoryColumns({})}
        dataSource={collutionHistoryData}
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
  );
}
