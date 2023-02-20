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
    render(_value, _record, index) {
      return index + 1;
    },
  },
  {
    title: '프로젝트명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '공모금액(원)',
    key: 'totalPublicOfferingAmount',
    dataIndex: 'totalPublicOfferingAmount',
    align: 'center',
    render: (val) => {
      const newVal = +val;
      return newVal.toLocaleString() + ' 원';
    },
  },
  {
    title: '1TABS 당 공모가(원)',
    key: 'publicOfferingPrice',
    dataIndex: 'publicOfferingPrice',
    align: 'center',
    render: (val) => {
      const newVal = +val;
      return newVal.toLocaleString() + ' 원';
    },
  },
  {
    title: 'TABS 수',
    key: 'publicOfferingQuantity',
    dataIndex: 'publicOfferingQuantity',
    align: 'center',
    render: (val) => {
      const newVal = +val;
      return newVal.toLocaleString() + ' 개';
    },
  },
  {
    title: '공모율',
    key: 'percent',
    dataIndex: 'percent',
    align: 'center',
    render: (val) => {
      return val ? val + '%' : '-';
    },
  },
  {
    title: '체결가',
    key: 'closingPrice',
    dataIndex: 'closingPrice',
    align: 'center',
    render: (val) => {
      const newVal = +val;
      return val ? newVal.toLocaleString() : '-';
    },
  },
  {
    title: '등락율',
    key: 'fluctuationRatio',
    dataIndex: 'fluctuationRatio',
    align: 'center',
    render: (val) => {
      return val ? val + '%' : '-';
    },
  },
  {
    title: '매각투표율',
    key: 'saleVote',
    dataIndex: 'saleVote',
    align: 'center',
    render: (val) => {
      return val ? val + '%' : '-';
    },
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
    key: 'publicOfferingStatus',
    dataIndex: 'publicOfferingStatus',
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
