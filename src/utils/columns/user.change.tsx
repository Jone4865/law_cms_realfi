import { ColumnsType } from 'antd/lib/table';

import moment from 'moment';
import { ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput } from '../../graphql/generated/graphql';
import { approveStatusToText } from '../approveStatusToText';

type Props = {
  detail?: boolean;
};

export const userChangeColumns = ({
  detail,
}: Props): ColumnsType<ChangeInvestmentQualificationInFindManyChangeInvestmentQualificationByAdminOutput> => [
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
    title: '현재자격',
    key: 'originInvestmentQualification',
    dataIndex: 'originInvestmentQualification',
    align: 'center',
    render(value) {
      return (
        value.name +
        `(${
          value.possibleInvestmentAmount === 'Infinity'
            ? '무제한'
            : value.possibleInvestmentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만'
        })`
      );
    },
  },
  {
    title: '희망자격',
    key: 'investmentQualification',
    dataIndex: 'investmentQualification',
    align: 'center',
    render(value) {
      return (
        value.name +
        `(${
          value.possibleInvestmentAmount === 'Infinity'
            ? '무제한'
            : value.possibleInvestmentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만'
        })`
      );
    },
  },
  {
    title: '회원이름',
    key: 'user',
    dataIndex: 'user',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '휴대폰 번호',
    key: 'user',
    dataIndex: 'user',
    align: 'center',
    render(value) {
      return value.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    },
  },
  {
    title: '신청일자',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '처리일자',
    key: 'treatedAt',
    dataIndex: 'treatedAt',
    align: 'center',
    render: (val: string) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
  {
    title: '요건분류',
    key: 'investmentType',
    dataIndex: 'investmentType',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '처리상태',
    key: 'approveStatus',
    dataIndex: 'approveStatus',
    align: 'center',
    render(value) {
      return value === 'WAIT' ? (
        <div style={{ color: 'orange' }}>{approveStatusToText(value)}</div>
      ) : value === 'APPROVED' ? (
        <div style={{ color: 'blue' }}>{approveStatusToText(value)}</div>
      ) : (
        <div style={{ color: 'red' }}>{approveStatusToText(value)}</div>
      );
    },
  },
  {
    title: '책임관리자',
    key: 'admin',
    dataIndex: 'admin',
    align: 'center',
    render(value) {
      return value ? value.name : '-';
    },
  },
];
