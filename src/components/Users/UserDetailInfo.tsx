import moment from 'moment';
import { FindUserByAdminOutput } from '../../graphql/generated/graphql';
import * as S from './style';

type Props = {
  detailData: FindUserByAdminOutput | undefined;
};

export function UserDetailInfo({ detailData }: Props) {
  const basicInfo = ['이름', '휴대폰 번호', '생년월일', '가입일자', '투자자격'];
  const accountInfo = ['예치금', '전체 증거금', '공모 증거금', '매수 증거금'];
  return (
    <S.Container>
      <S.Wrap>
        <S.SubTitle>기본정보</S.SubTitle>
        <S.BottomWrap>
          <S.LeftWrap>
            {basicInfo.map((item) => (
              <S.Left>{item}</S.Left>
            ))}
          </S.LeftWrap>
          <S.RightWrap>
            <S.Right>{detailData?.name}</S.Right>
            <S.Right>
              {detailData?.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
            </S.Right>
            <S.Right>{detailData?.birth}</S.Right>
            <S.Right>{moment(detailData?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</S.Right>
            <S.Right>{detailData?.investmentQualification.name}</S.Right>
          </S.RightWrap>
        </S.BottomWrap>
      </S.Wrap>
      <S.Wrap>
        <S.SubTitle>계좌정보</S.SubTitle>
        <S.BottomWrap>
          <S.LeftWrap>
            {accountInfo.map((item) => (
              <S.Left>{item}</S.Left>
            ))}
          </S.LeftWrap>
          <S.RightWrap>
            <S.Right>
              {detailData?.wallet?.balance.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </S.Right>
            <S.Right>
              {detailData?.wallet?.totalDeposit.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </S.Right>
            <S.Right>
              {detailData?.wallet?.publicOfferingDeposit
                .toString()
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </S.Right>
            <S.Right>
              {detailData?.wallet?.buyDeposit.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </S.Right>
          </S.RightWrap>
        </S.BottomWrap>
      </S.Wrap>
    </S.Container>
  );
}
