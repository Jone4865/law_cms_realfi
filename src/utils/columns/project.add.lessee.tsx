import { Button, DatePicker, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type LesseeType = {
  id: number;
};

type Props = {};

export const lesseeColumns = ({}: Props): ColumnsType<LesseeType> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (val, record, index) => {
      return index + 1;
    },
  },
  {
    title: '임차인',
    key: 'lessee',
    dataIndex: 'lessee',
    align: 'center',
    render: (val, record, index) => {
      return <Input placeholder="입력해주세요." />;
    },
  },
  {
    title: '임대차계약기간 시작',
    key: 'leaseStartedAt',
    dataIndex: 'leaseStartedAt',
    align: 'center',
    render: (val, record, index) => {
      return <DatePicker />;
    },
  },
  {
    key: 'string',
    dataIndex: 'string',
    align: 'center',
    render: (val, record, index) => {
      return '~';
    },
  },
  {
    title: '임대차계약기간 종료',
    key: 'leaseEndedAt',
    dataIndex: 'leaseEndedAt',
    align: 'center',
    render: (val, record, index) => {
      return <DatePicker />;
    },
  },
];
