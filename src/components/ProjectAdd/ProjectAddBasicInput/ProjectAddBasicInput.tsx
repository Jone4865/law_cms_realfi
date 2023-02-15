import { DatePicker } from 'antd';
import moment from 'moment';
import * as S from './../style';

type Props = {
  title: string;
  saveName: string;
  handleChange: (key: string, value: any) => void;
  subTitle?: React.ReactNode;
  essential?: boolean;
  datePicker?: boolean;
  disable?: boolean;
  value: string;
};

export function ProjectAddBasicInput({
  title,
  saveName,
  handleChange,
  subTitle,
  essential = true,
  datePicker,
  disable,
  value,
}: Props) {
  return (
    <S.AddFormWrap>
      <S.AddTitle>
        <S.Red>{essential && '*'}</S.Red>
        {title}
        {subTitle && subTitle} :
      </S.AddTitle>
      {datePicker ? (
        <DatePicker
          defaultValue={moment(value)}
          onChange={(v) => {
            handleChange && handleChange(`${saveName}`, new Date(moment(v).format('YYYY-MM-DD')));
          }}
          style={{ width: '370px' }}
        />
      ) : (
        <S.AddInput
          value={value}
          disabled={disable && true}
          onChange={(e) => {
            handleChange && handleChange(`${saveName}`, e.target.value);
          }}
          placeholder="입력해주세요."
        />
      )}
    </S.AddFormWrap>
  );
}
