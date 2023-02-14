import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Button } from 'antd';

export type UserChangeType = {
  nickname: string;
  email: string;
  name: string;
  createdAt: string;
  phone: string;
  nowMax: string;
  hopeMax: string;
  index: string;
  document: string;
  now: string;
  manager: string;
  shippingAddresses: {
    id: number;
    address: string;
    addressDetail: string;
    isDefault: boolean;
  }[];
};

export const userChangeColumns: ColumnsType<UserChangeType> = [
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
    title: '현재한도',
    key: 'nowMax',
    dataIndex: 'nowMax',
    align: 'center',
  },
  {
    title: '희망한도',
    key: 'hopeMax',
    dataIndex: 'hopeMax',
    align: 'center',
  },
  {
    title: '회원이름',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '휴대폰 번호',
    key: 'phone',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '신청일자',
    key: 'postdAt',
    dataIndex: 'postdAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '처리일자',
    key: 'donedAt',
    dataIndex: 'donedAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '요건분류',
    key: 'index',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '인증 서류',
    key: 'document',
    dataIndex: 'document',
    align: 'center',
    render: (val: string, record) => {
      return <Button type="primary">보기</Button>;
    },
  },
  {
    title: '처리상태',
    key: 'now',
    dataIndex: 'now',
    align: 'center',
  },
  {
    title: '책임관리자',
    key: 'manager',
    dataIndex: 'manager',
    align: 'center',
  },
];
