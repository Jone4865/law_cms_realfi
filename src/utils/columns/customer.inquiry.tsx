import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { UserInquiryInFindManyUserInquiryByAdminOutput } from '../../graphql/generated/graphql';

type Props = {
  visible: boolean;
};

export const inquiryColumns = ({
  visible,
}: Props): ColumnsType<UserInquiryInFindManyUserInquiryByAdminOutput> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '문의 유형',
    key: 'inquiryKind',
    dataIndex: 'userInquiryCategory',
    align: 'center',
    render: (val) => {
      return val.name;
    },
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
  },
  {
    title: '접수일시',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD hh:mm');
    },
    align: 'center',
  },
  {
    title: '처리일시',
    key: 'repliedAt',
    dataIndex: 'repliedAt',
    render: (val, record) => {
      return record.reply ? moment(val).format('YYYY-MM-DD hh:mm') : '-';
    },
    align: 'center',
  },
  {
    title: '전화번호',
    key: 'phone',
    dataIndex: 'user',
    align: 'center',
    render: (val) => {
      return val.phone;
    },
  },
  {
    title: '처리자',
    key: 'name',
    dataIndex: 'admin',
    align: 'center',
    render: (val) => {
      return val?.name ? val.name : '-';
    },
  },

  {
    title: '처리 여부',
    key: 'isReply',
    dataIndex: 'reply',
    render: (val?: string) => {
      return val ? <Tag color="blue">완료</Tag> : <Tag color="error">미처리</Tag>;
    },
    align: 'center',
  },
];
