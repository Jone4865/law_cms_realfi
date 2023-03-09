import { useLazyQuery } from '@apollo/client';
import { notification, Table } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { FindManyWalletTransferByAdminOutput } from '../../graphql/generated/graphql';
import { FIND_MANY_WALLET_TRANSFER_BY_ADMIN } from '../../graphql/query';
import { walletTransferColumns } from '../../utils/columns';
import { Calendar } from '../Calendar';

type Props = {
  email: string | undefined;
};

export function WalletTransfer({ email }: Props) {
  const [startDate, setStarteDate] = useState<Moment>(moment(new Date()));
  const [endDate, setEndDate] = useState<Moment>(moment());
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [walletData, setWalletData] =
    useState<FindManyWalletTransferByAdminOutput['walletTransfers']>();

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const [findManyWalletTransferByAdmin] = useLazyQuery(FIND_MANY_WALLET_TRANSFER_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyWalletTransferByAdmin.totalCount);
      setWalletData(data.findManyWalletTransferByAdmin.walletTransfers);
    },
  });

  useEffect(() => {
    findManyWalletTransferByAdmin({
      variables: {
        email: email ? email : '',
        gte: new Date(moment(startDate).format('YYYY-MM-DD 00:00:00')),
        lt: endDate,
        skip: skip,
        take: take,
      },
    });
  }, [email, startDate, endDate, take]);

  return (
    <div>
      <Calendar
        setStartDate={setStarteDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <Table
        columns={walletTransferColumns({})}
        dataSource={walletData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        // loading={loading}
        style={{
          marginTop: 30,
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
