import { DatePicker, Input } from 'antd';
import moment from 'moment';
import * as S from '../style';

type Props = {
  title: string;
  value: string | number | null | undefined;
  saveName?: string;
  subTitle?: React.ReactNode;
  essential?: boolean;
  datePicker?: boolean;
  disable?: boolean;
  placeHolder?: boolean;
  color?: string;
  handleChange?: (key: string, value: any) => void;
};

export function InputBasic({
  title,
  saveName,
  subTitle,
  essential = true,
  datePicker,
  disable,
  value,
  placeHolder = true,
  color,
  handleChange,
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
          disabled={disable && true}
          value={value ? moment(value) : undefined}
          onChange={(v) => {
            handleChange && handleChange(`${saveName}`, moment(v).format('YYYY-MM-DD'));
          }}
          style={{ width: '19.3vw' }}
        />
      ) : (
        <Input
          style={{ width: '19.3vw', color: `${color}`, minWidth: '255px' }}
          value={
            typeof value === 'string'
              ? value
              : !Number.isNaN(value)
              ? value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
          disabled={disable && true}
          onChange={(e) => {
            typeof value === 'string'
              ? handleChange && handleChange(`${saveName}`, e.target.value)
              : handleChange && handleChange(`${saveName}`, e.target.value.replace(/\D/g, ''));
          }}
          placeholder={placeHolder ? '입력해주세요.' : '-'}
        />
      )}
    </S.AddFormWrap>
  );
}
