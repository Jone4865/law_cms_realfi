import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { FindManyUserInquiryByAdminOutput } from '../../graphql/generated/graphql';
import { transferKindToText } from '../transferKindToText';

export const userDetailInquiryColumns = ({}): ColumnsType<
  FindManyUserInquiryByAdminOutput['userInquiries'][0]
> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(_value, _record, index) {
      return index + 1;
    },
  },
  {
    title: '문의내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '유저명',
    key: 'user',
    dataIndex: 'user',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '문의 날짜',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render(value) {
      return moment(value).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  {
    title: '처리 날짜',
    key: 'repliedAt',
    dataIndex: 'repliedAt',
    align: 'center',
    render(value) {
      return value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : '-';
    },
  },
  {
    title: '답변 상태',
    key: 'repliedAt',
    dataIndex: 'repliedAt',
    align: 'center',
    render(value) {
      return value ? (
        <div style={{ color: 'blue' }}>완료</div>
      ) : (
        <div style={{ color: 'orange' }}>답변대기</div>
      );
    },
  },
  {
    title: '답변자',
    key: 'admin',
    dataIndex: 'admin',
    align: 'center',
    render(value) {
      return value ? value.name : '-';
    },
  },
];
