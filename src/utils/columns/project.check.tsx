import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Switch } from 'antd';

export type ProjectCheckType = {
  id: number;
  name: string;
  price: string;
  oneTabsPrice: string;
  tabsCount: string;
  percent: string;
  closingPrice: string;
  upDown: string;
  saleVote: string;
  date: Date;
  manager: string;
  state: string;
};

export const projectCheckColumns: ColumnsType<ProjectCheckType> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '프로젝트명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '공모금액(원)',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '1TABS 당 공모가(원)',
    key: 'oneTabsPrice',
    dataIndex: 'oneTabsPrice',
    align: 'center',
  },
  {
    title: 'TABS 수',
    key: 'tabsCount',
    dataIndex: 'tabsCount',
    align: 'center',
  },
  {
    title: '공모율',
    key: 'percent',
    dataIndex: 'percent',
    align: 'center',
  },
  {
    title: '체결가',
    key: 'closingPrice',
    dataIndex: 'closingPrice',
    align: 'center',
  },
  {
    title: '등락율',
    key: 'upDown',
    dataIndex: 'upDown',
    align: 'center',
  },
  {
    title: '매각투표율',
    key: 'saleVote',
    dataIndex: 'saleVote',
    align: 'center',
  },
  {
    title: '등록일자',
    key: 'date',
    dataIndex: 'date',
    align: 'center',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
  {
    title: '등록관리자',
    key: 'manager',
    dataIndex: 'manager',
    align: 'center',
  },
  {
    title: '상태',
    key: 'state',
    dataIndex: 'state',
    align: 'center',
  },
  {
    title: '노출',
    key: 'see',
    dataIndex: 'see',
    align: 'center',
    render: (val) => {
      return <Switch></Switch>;
    },
  },
];
