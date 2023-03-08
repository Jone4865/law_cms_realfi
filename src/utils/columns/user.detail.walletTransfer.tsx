import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { UserInFindManyUserByAdminOutput } from '../../graphql/generated/graphql';

export type UserType = {
  nickname: string;
  email: string;
  name: string;
  createdAt: string;
  phone: string;
  birthday?: string;
  account?: string;
  max?: string;
  do?: string;
  content?: string;
  shippingAddresses: {
    id: number;
    address: string;
    addressDetail: string;
    isDefault: boolean;
  }[];
};

export const walletTransferColumns = ({}): ColumnsType<UserInFindManyUserByAdminOutput> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '날짜',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: '내용',
    key: 'transferKind',
    dataIndex: 'transferKind',
    align: 'center',
  },
  {
    title: '금액',
    key: 'calcAmount',
    dataIndex: 'calcAmount',
    align: 'center',
  },
  {
    title: '상세',
    key: 'project',
    dataIndex: 'project',
    align: 'center',
    render(value) {
      return value?.name;
    },
  },
];
