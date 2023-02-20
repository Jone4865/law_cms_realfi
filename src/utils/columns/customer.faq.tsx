import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import {
  FaqInFindManyFaqByAdminOutput,
  FindManyFaqCategoryQuery,
} from '../../graphql/generated/graphql';
import { deleteTag } from '../deleteTag';

export type FaqType = {
  id: number;
  question: string;
  answer: string;
  faqCategory: KindType;
  admin: {
    name: string;
  };
  createdAt: string;
};

type Props = {
  faqCategorys: FindManyFaqCategoryQuery['findManyFaqCategory'];
};

export const faqColumns = ({ faqCategorys }: Props): ColumnsType<FaqInFindManyFaqByAdminOutput> => [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'FAQ 종류',
    key: 'faqCategory',
    dataIndex: 'faqCategory',
    align: 'center',
    render: (val) => {
      return val.name;
    },
    filters: faqCategorys.map((v) => ({ text: v.name, value: v.id })),
  },
  {
    title: '답변',
    key: 'answer',
    dataIndex: 'answer',
    align: 'center',
    render: (val: string) => {
      return val.length > 40 ? deleteTag(val.slice(0, 40)) + '...' : deleteTag(val);
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
    title: '작성자',
    key: 'admin',
    dataIndex: 'admin',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
];
