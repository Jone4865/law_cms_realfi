import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FIND_USER_BY_ADMIN } from '../../graphql/query';
import { notification } from 'antd';
import { FindUserByAdminOutput } from '../../graphql/generated/graphql';
import { TabsWallet, UserDetailInfo, UserInquiry, WalletTransfer } from '../../components/Users';
import * as S from './style';

export function UserDetail() {
  const Btns = ['상세정보', '거래내역', '보유부동산', '문의내역'];
  const params = useParams();
  const [nowAble, setNowAble] = useState('상세정보');
  const [detailData, setDetailData] = useState<FindUserByAdminOutput>();

  const [findUserByAdmin] = useLazyQuery(FIND_USER_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setDetailData(data.findUserByAdmin);
    },
  });

  useEffect(() => {
    findUserByAdmin({
      variables: {
        email: params.userEamil ? params.userEamil : '',
      },
    });
  }, []);

  return (
    <div>
      <S.Title>{detailData?.name}의 회원상세</S.Title>
      <S.Btns>
        {Btns.map((item) => (
          <S.UnableBtn
            onClick={() => setNowAble(item)}
            key={item}
            style={{
              backgroundColor: `${nowAble === item ? '#5d28dd' : ''}`,
            }}
          >
            {item}
          </S.UnableBtn>
        ))}
      </S.Btns>
      {nowAble === '상세정보' && <UserDetailInfo detailData={detailData} />}
      {nowAble === '거래내역' && <WalletTransfer email={params.userEamil} />}
      {nowAble === '보유부동산' && <TabsWallet email={params.userEamil} />}
      {nowAble === '문의내역' && <UserInquiry email={params.userEamil} />}
    </div>
  );
}
