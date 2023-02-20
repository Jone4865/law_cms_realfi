import { DatePicker, Input } from 'antd';
import moment from 'moment';
import * as S from '../style';

type Props = {
  title: string;
  saveName: string;
  value: string | number;
  handleChange: (key: string, value: any) => void;
  subTitle?: React.ReactNode;
  essential?: boolean;
  datePicker?: boolean;
  disable?: boolean;
};

export function InputBasic({
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
          defaultValue={value ? moment(value) : undefined}
          onChange={(v) => {
            console.log(value);
            handleChange && handleChange(`${saveName}`, moment(v).format('YYYY-MM-DD'));
          }}
          style={{ width: '370px' }}
        />
      ) : (
        <Input
          style={{ width: '371px' }}
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
              ? handleChange(`${saveName}`, e.target.value)
              : handleChange(`${saveName}`, e.target.value.replace(/\D/g, ''));
          }}
          placeholder="입력해주세요."
        />
      )}
    </S.AddFormWrap>
  );
}
