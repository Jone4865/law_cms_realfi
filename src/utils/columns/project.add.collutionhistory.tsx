import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { PublicOfferingInFindManyPublicOfferingByAdminOutput } from '../../graphql/generated/graphql';

type Props = {};

export const collutionHistoryColumns =
  ({}: Props): ColumnsType<PublicOfferingInFindManyPublicOfferingByAdminOutput> => [
    {
      title: 'no',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '이름',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '핸드폰 번호',
      key: 'phone',
      dataIndex: 'phone',
      align: 'center',
      render(value) {
        return value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      },
    },
    {
      title: '공모TABS',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
      render: (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: '공모금액',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      render: (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: '공모일자',
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD');
      },
    },
    {
      title: '공모상태',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (val) => {
        return val;
      },
    },
    {
      title: '환불일자',
      key: 'canceledAt',
      dataIndex: 'canceledAt',
      align: 'center',
      render: (val) => {
        return val ? moment(val).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '환불',
      key: 'isCanceled',
      dataIndex: 'isCanceled',
      align: 'center',
      render: (val) => {
        return val ? <Button type="primary">환불</Button> : '-';
      },
    },
  ];
