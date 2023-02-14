import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Button, Divider, Form, Input, Tag, Table, notification } from 'antd';

export type PolicyType = {
  id: number;
  essential: boolean;
  policyKind: {
    name: string;
    id: number;
  };
  content: string;
  admin: {
    name: string;
  };
  createdAt: string;
};

export const policyColumns: ColumnsType<PolicyType> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '약관 제목',
    key: 'policyKind',
    dataIndex: 'policyKind',
    align: 'center',
    render: (val: { name: string }) => {
      return val.name;
    },
  },
  // {
  //   title: '약관 내용',
  //   key: 'content',
  //   dataIndex: 'content',
  //   align: 'center',
  //   render: (val: string) => {
  //     return val.length > 40 ? val.substr(0, 40) + '...' : val;
  //   },
  // },
  {
    title: '작성자',
    key: 'admin',
    dataIndex: 'admin',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '생성 일자',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '필수여부',
    key: 'essential',
    dataIndex: 'essential',
    align: 'center',
    render: (val) => {
      return val ? <Tag color="blue">필수</Tag> : <Tag color="error">선택</Tag>;
    },
  },
];
