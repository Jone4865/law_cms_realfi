import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FindManyTabsWalletByAdminOutput } from '../../graphql/generated/graphql';

type Props = {
  setDividendModalView: React.Dispatch<React.SetStateAction<boolean>>;
  // setTransactionModalView: React.Dispatch<React.SetStateAction<boolean>>;
};

export const tabsWalletClumns = ({
  setDividendModalView,
}: // setTransactionModalView,
Props): ColumnsType<FindManyTabsWalletByAdminOutput['tabsWallets'][0]> => [
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
    title: '부동산 ID',
    key: 'project',
    dataIndex: 'project',
    align: 'center',
    render(value) {
      return value.id;
    },
  },
  {
    title: '부동산명',
    key: 'project',
    dataIndex: 'project',
    align: 'center',
    render(value) {
      return value.name;
    },
  },
  {
    title: '보유 TABS',
    key: 'tabsCount',
    dataIndex: 'tabsCount',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: 'TABS 평균 구매가',
    key: 'averagePurchasePrice',
    dataIndex: 'averagePurchasePrice',
    align: 'center',
    render(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '배당내역',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(_value) {
      return (
        <Button onClick={() => setDividendModalView(true)} type="primary">
          상세보기
        </Button>
      );
    },
  },
  // {
  //   title: '거래상세',
  //   key: 'id',
  //   dataIndex: 'id',
  //   align: 'center',
  //   render(_value) {
  //     return (
  //       <Button onClick={() => setTransactionModalView(true)} type="primary">
  //         상세보기
  //       </Button>
  //     );
  //   },
  // },
];
