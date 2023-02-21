import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Tag } from 'antd';
import { PolicyInFindManyPolicyOutput } from '../../graphql/generated/graphql';

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

export const policyColumns: ColumnsType<PolicyInFindManyPolicyOutput> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    render: (val) => {
      return val;
    },
  },
  {
    title: '약관 제목',
    key: 'title',
    dataIndex: 'title',
    align: 'center',
  },
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
    key: 'isRequired',
    dataIndex: 'isRequired',
    align: 'center',
    render: (val) => {
      return val ? <Tag color="blue">필수</Tag> : <Tag color="error">선택</Tag>;
    },
  },
];
