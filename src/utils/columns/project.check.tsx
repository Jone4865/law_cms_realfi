import { Form, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Switch } from 'antd';
import { publicOfferingStatusToText } from '../publicOfferingStatusToText';
import { MarketStatus, PublicOfferingStatus, VoteStatus } from '../../graphql/generated/graphql';
import { marketStatusToText } from '../marketStatusToText';
import { voteStatusToText } from '../voteStatusToText';

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
  publicOfferingStatus: PublicOfferingStatus;
  marketStatus: MarketStatus;
  voteStatus: VoteStatus;
};

type Props = {
  ToggleClickhandle: (id: number) => void;
};

export const projectCheckColumns = ({
  ToggleClickhandle,
}: Props): ColumnsType<ProjectCheckType> => [
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
      return newVal.toLocaleString();
    },
  },
  {
    title: '1TABS 당 공모가(원)',
    key: 'publicOfferingPrice',
    dataIndex: 'publicOfferingPrice',
    align: 'center',
    render: (val) => {
      const newVal = +val;
      return newVal.toLocaleString();
    },
  },
  {
    title: '공모율',
    key: 'publicOfferingRatio',
    dataIndex: 'publicOfferingRatio',
    align: 'center',
    render: (val) => {
      return val ? val + '%' : '-';
    },
  },
  {
    title: '체결가',
    key: 'currentPrice',
    dataIndex: 'currentPrice',
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
      return val < 0 ? '▼' + -val + '%' : +val === 0 || val === null ? '-' : '▲' + val + '%';
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
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
  {
    title: '상태',
    key: 'publicOfferingStatus',
    dataIndex: 'publicOfferingStatus',
    align: 'center',
    render(_val, record) {
      return voteStatusToText(record.voteStatus)
        ? publicOfferingStatusToText(record.publicOfferingStatus) +
            ' / ' +
            marketStatusToText(record.marketStatus) +
            ' / ' +
            voteStatusToText(record.voteStatus)
        : publicOfferingStatusToText(record.publicOfferingStatus) +
            ' / ' +
            marketStatusToText(record.marketStatus);
    },
  },
  {
    title: '노출',
    key: 'isVisible',
    dataIndex: 'isVisible',
    align: 'center',
    render: (val, record) => {
      return (
        <Form onClick={(e) => e.stopPropagation()}>
          <Switch defaultChecked={val} onChange={() => ToggleClickhandle(record.id)} />
        </Form>
      );
    },
  },
];
