import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { PublicOfferingInFindManyPublicOfferingByAdminOutput } from '../../graphql/generated/graphql';

type Props = {};

export const transactioDetailsColumns =
  ({}: Props): ColumnsType<PublicOfferingInFindManyPublicOfferingByAdminOutput> => [
    {
      title: 'no',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '거래시간',
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center',
      render: (val) => {
        return moment(val)?.format('YYYY-MM-DD');
      },
    },
    {
      title: '체결가',
      key: 'askPrice',
      dataIndex: 'askPrice',
      align: 'center',
      render: (val) => {
        return val?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: '등락률',
      key: 'fluctuationRatio',
      dataIndex: 'fluctuationRatio',
      align: 'center',
    },
    {
      title: '등락가',
      key: 'fluctuation',
      dataIndex: 'fluctuation',
      align: 'center',
    },
    {
      title: '체결량',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
      render: (val) => {
        return val?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: '매도자',
      key: 'seller',
      dataIndex: 'seller',
      align: 'center',
    },
    {
      title: '매수자',
      key: 'buyer',
      dataIndex: 'buyer',
      align: 'center',
    },
  ];
