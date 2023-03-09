import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { FindManyDividendInUserByAdminOutput } from '../../graphql/generated/graphql';

export const userDividendClumns = ({}): ColumnsType<
  FindManyDividendInUserByAdminOutput['dividends'][0]
> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(_value, _record, index) {
      return index + 1;
    },
  },

  {
    title: '배당명',
    key: 'projectDividend',
    dataIndex: 'projectDividend',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '배당날짜',
    key: 'projectDividend',
    dataIndex: 'projectDividend',
    align: 'center',
    render(value) {
      return moment(value.dividendAt).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  {
    title: '수수료',
    key: 'tax',
    dataIndex: 'tax',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '보유 TABS 수',
    key: 'tabsCount',
    dataIndex: 'tabsCount',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: 'TABS당 배당금(원)',
    key: 'project',
    dataIndex: 'project',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '합계(원)',
    key: 'calcDividend',
    dataIndex: 'calcDividend',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
];
