import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { FindManySellVoteByAdminOutput } from '../../graphql/generated/graphql';

type Props = {};

export const sellvoteColumns = ({}: Props): ColumnsType<
  FindManySellVoteByAdminOutput['sellVotes'][0]
> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '이름',
    key: 'name',
    dataIndex: 'user',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '보유 TABS 수',
    key: 'tabsCount',
    dataIndex: 'tabsCount',
    align: 'center',
    render: (val) => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '명';
    },
  },
  {
    title: '투표일자',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD');
    },
  },
  {
    title: '전화번호',
    key: 'phone',
    dataIndex: 'user',
    align: 'center',
    render(value) {
      return value.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    },
  },
  {
    title: '투표',
    key: 'voteKind',
    dataIndex: 'voteKind',
    align: 'center',
    render(value) {
      return value;
    },
  },
];
