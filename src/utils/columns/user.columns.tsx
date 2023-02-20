import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
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

type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const userListColumns = ({
  setVisible,
}: Props): ColumnsType<UserInFindManyUserByAdminOutput> => [
  {
    render: (_val, _record, idx) => {
      return idx + 1;
    },
    title: 'no',
    key: 'no',
    dataIndex: 'no',
    align: 'center',
  },
  {
    title: '휴대폰 번호',
    key: 'phone',
    dataIndex: 'phone',
    align: 'center',
    render: (val) => {
      return val.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    },
  },
  {
    title: '회원명',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '생년월일',
    key: 'birth',
    dataIndex: 'birth',
    align: 'center',
  },
  {
    title: '가입일자',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '한도',
    key: 'possibleInvestmentAmount',
    dataIndex: 'possibleInvestmentAmount',
    align: 'center',
    render: (value) => {
      const newVal = +value;
      return newVal.toLocaleString();
    },
  },
  {
    title: '계좌생성여부',
    key: 'isExistAccount',
    dataIndex: 'isExistAccount',
    align: 'center',
    render(value) {
      return value ? 'O' : 'X';
    },
  },
  { title: '이용제한', key: 'block', dataIndex: 'block', align: 'center' },
  {
    title: '행동',
    key: 'do',
    dataIndex: 'do',
    align: 'center',
    render: (val: string, record) => {
      return (
        <Button type="primary" onClick={() => setVisible(true)}>
          자세히보기
        </Button>
      );
    },
  },
];
