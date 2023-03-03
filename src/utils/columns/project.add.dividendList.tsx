import { Form, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Switch } from 'antd';
import { publicOfferingStatusToText } from '../publicOfferingStatusToText';
import { MarketStatus, PublicOfferingStatus, VoteStatus } from '../../graphql/generated/graphql';
import { marketStatusToText } from '../marketStatusToText';
import { voteStatusToText } from '../voteStatusToText';

export const dividendListColumns: ColumnsType<any> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '이름(전화번호)',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
    render(value, record) {
      return value + `(${record.phone})`;
    },
  },
  {
    title: '보유 TABS수',
    key: 'tabsCount',
    dataIndex: 'tabsCount',
    align: 'center',
    render(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '세금',
    key: 'tax',
    dataIndex: 'tax',
    align: 'center',
    render(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '총 배당금',
    key: 'calcDividend',
    dataIndex: 'calcDividend',
    align: 'center',
    render(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
];
