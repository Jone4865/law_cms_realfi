import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { UserType } from '.';

export type InquiryType = {
  id: number;
  title: string;
  content: string;
  reply: string;
  repliedAt: Date;
  createdAt: Date;
  userInquiryCategory: {
    id: number;
    name: string;
  };
  admin: {
    name: string;
  };
  user: {
    name: string;
    phone: string;
  };
};

export const userInquiryColumns: ColumnsType<InquiryType> = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '문의 종류',
    key: 'inquiryKind',
    dataIndex: 'inquiryKind',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '문의 내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '문의 날짜',
    key: 'reportingDate',
    dataIndex: 'reportingDate',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '처리 날짜',
    key: 'processingDate',
    dataIndex: 'processingDate',
    align: 'center',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
  {
    title: '상태',
    key: 'isReply',
    dataIndex: 'reply',
    align: 'center',
    render: (val) => {
      return val ? (
        <Tag color="blue">완료</Tag>
      ) : (
        <Tag color="error">미처리</Tag>
      );
    },
  },
];
