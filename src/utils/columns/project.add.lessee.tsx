import { Button, DatePicker, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export type LesseeType = {
  id: number;
};

type Props = {
  handleChange: (key: string, value: any) => void;
  variables: any;
};

export const lesseeColumns = ({ handleChange, variables }: Props): ColumnsType<LesseeType> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (_val, _record, index) => {
      return index + 1;
    },
  },
  {
    title: '임차인',
    key: 'lessee',
    dataIndex: 'lessee',
    align: 'center',
    render: () => {
      return (
        <Input
          value={variables['lessee']}
          onChange={(e) => handleChange('lessee', e.target.value)}
          placeholder="입력해주세요."
        />
      );
    },
  },
  {
    title: '임대차계약기간 시작',
    key: 'leaseStartedAt',
    dataIndex: 'leaseStartedAt',
    align: 'center',
    render: () => {
      return (
        <DatePicker
          value={variables['leaseStartedAt'] ? moment(variables['leaseStartedAt']) : undefined}
          onChange={(v) => handleChange('leaseStartedAt', moment(v).format('YYYY-MM-DD'))}
        />
      );
    },
  },
  {
    key: 'string',
    dataIndex: 'string',
    align: 'center',
    render: () => {
      return '~';
    },
  },
  {
    title: '임대차계약기간 종료',
    key: 'leaseEndedAt',
    dataIndex: 'leaseEndedAt',
    align: 'center',
    render: () => {
      return (
        <DatePicker
          value={variables['leaseEndedAt'] ? moment(variables['leaseEndedAt']) : undefined}
          onChange={(v) => handleChange('leaseEndedAt', moment(v).format('YYYY-MM-DD'))}
        />
      );
    },
  },
];
