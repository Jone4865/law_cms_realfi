import { DatePicker } from 'antd';
import { SubTitle } from 'chart.js';
import * as S from './style';

type Props = {
  title: string;
  subTitle?: React.ReactNode;
  red?: boolean;
  datePicker?: boolean;
};

export function ProjectAddInput({ title, red = true, datePicker, subTitle }: Props) {
  return (
    <S.AddFormWrap>
      <S.AddTitle>
        <S.Red>{red && '*'}</S.Red>
        {title}
        {subTitle && subTitle} :
      </S.AddTitle>
      {datePicker ? (
        <DatePicker style={{ width: '370px' }} />
      ) : (
        <S.AddInput placeholder="입력해주세요." />
      )}
    </S.AddFormWrap>
  );
}
