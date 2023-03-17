import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { FindManyWalletTransferByAdminOutput } from '../../graphql/generated/graphql';
import { transferKindToText } from '../transferKindToText';

export const walletTransferColumns = ({}): ColumnsType<
  FindManyWalletTransferByAdminOutput['walletTransfers'][0]
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
    title: '날짜',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render(value) {
      return moment(value).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  {
    title: '내용',
    key: 'transferKind',
    dataIndex: 'transferKind',
    align: 'center',
    render(value) {
      return transferKindToText(value);
    },
  },
  {
    title: '금액',
    key: 'calcAmount',
    dataIndex: 'calcAmount',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '상세',
    key: 'project',
    dataIndex: 'project',
    align: 'center',
    render(value, record) {
      return value
        ? value?.name
        : record.transferKind === 'DEPOSIT'
        ? '예치금 입금'
        : '예치금 출금';
    },
  },
];
