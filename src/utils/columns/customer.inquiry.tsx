import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import {
  FindManyUserInquiryCategoryQuery,
  UserInquiryInFindManyUserInquiryByAdminOutput,
} from '../../graphql/generated/graphql';

type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  inquiryCategorys: FindManyUserInquiryCategoryQuery['findManyUserInquiryCategory'];
};

export const inquiryColumns = ({
  setVisible,
  inquiryCategorys,
}: Props): ColumnsType<UserInquiryInFindManyUserInquiryByAdminOutput> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '문의 유형',
    key: 'userInquiryCategory',
    dataIndex: 'userInquiryCategory',
    align: 'center',
    render: (val) => {
      return val.name;
    },
    filters: inquiryCategorys.map((v) => ({ text: v.name, value: v.id })),
    filterMultiple: false,
  },
  {
    title: '이름',
    key: 'name',
    dataIndex: 'user',
    align: 'center',
    render: (val) => {
      return val?.name ? <span onClick={(e) => setVisible(true)}>{val.name}</span> : '-';
    },
  },
  {
    title: '전화번호',
    key: 'phone',
    dataIndex: 'user',
    align: 'center',
    render: (val) => {
      return val.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    },
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
    title: '처리 여부',
    key: 'isReply',
    dataIndex: 'reply',
    render: (val?: string) => {
      return val ? <Tag color="blue">완료</Tag> : <Tag color="error">미처리</Tag>;
    },
    align: 'center',
  },
];
