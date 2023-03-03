import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { FindManyProjectDividendByAdminQuery } from '../../graphql/generated/graphql';

type Props = {
  handlePayClick: () => void;
  handlefindDividendListClick: () => void;
};

export const dividendmanagementColumns = ({
  handlePayClick,
  handlefindDividendListClick,
}: Props): ColumnsType<
  FindManyProjectDividendByAdminQuery['findManyProjectDividendByAdmin']['projectDividends'][0]
> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '배당명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '기준일(마감일)',
    key: 'closingDate',
    dataIndex: 'closingDate',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD');
    },
  },
  {
    title: '배당 날짜',
    key: 'dividendAt',
    dataIndex: 'dividendAt',
    align: 'center',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '운영이익금(원)',
    key: 'operatingProfit',
    dataIndex: 'operatingProfit',
    align: 'center',
    render: (val) => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: 'TABS당 배당금(원)',
    key: 'dividendPerTabs',
    dataIndex: 'dividendPerTabs',
    align: 'center',
    render: (val) => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '배당자 수(명)',
    key: 'dividendCount',
    dataIndex: 'dividendCount',
    align: 'center',
    render: (val) => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '명';
    },
  },
  {
    title: '배당자 목록',
    key: 'canceledAt',
    dataIndex: 'dividendAt',
    align: 'center',
    render: (val) => {
      return val ? (
        <Button
          onClick={(e) => {
            handlefindDividendListClick();
          }}
          type="primary"
        >
          확인하기
        </Button>
      ) : (
        '-'
      );
    },
  },
  {
    title: '배당금 입금',
    key: 'isCanceled',
    dataIndex: 'dividendAt',
    align: 'center',
    render: (val) => {
      return !val ? (
        <Button onClick={handlePayClick} type="primary">
          배당금 입금
        </Button>
      ) : (
        '-'
      );
    },
  },
  {
    title: '알림톡 보내기',
    key: 'isCanceled',
    dataIndex: 'dividendAt',
    align: 'center',
    render: (val) => {
      return !val ? <Button type="primary">알림톡 보내기</Button> : '-';
    },
  },
];
