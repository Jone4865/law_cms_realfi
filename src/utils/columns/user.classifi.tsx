import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Button } from 'antd';

export type UserType = {
  nickname: string;
  email: string;
  name: string;
  createdAt: string;
  phone: string;
  content?: string;
  max?: string;
  do?: string;
  shippingAddresses: {
    id: number;
    address: string;
    addressDetail: string;
    isDefault: boolean;
  }[];
};

export const userClassifiColumns: ColumnsType<UserType> = [
  {
    title: 'no',
    key: 'no',
    dataIndex: 'no',
    align: 'center',
    render: (_val, _record, idx) => {
      return idx + 1;
    },
  },
  {
    title: '분류명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '분류 내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '한도',
    key: 'max',
    dataIndex: 'max',
    align: 'center',
  },
  {
    title: '행동',
    key: 'do',
    dataIndex: 'do',
    align: 'center',
    render: (val: string, record) => {
      return <Button type="primary">삭제</Button>;
    },
  },
];
