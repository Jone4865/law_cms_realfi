import { DatePicker } from 'antd';
import moment from 'moment';
import * as S from './../style';

type Props = {
  title: string;
  disabled: boolean;
  disableDate: Date;
  value: Date;
  saveName?: string;
  isBetwin?: boolean;
  handleOnChange?: (key: string, value: string) => void;
};

export function AddDateInput({
  title,
  disabled,
  saveName,
  disableDate,
  value,
  isBetwin = false,
  handleOnChange,
}: Props) {
  return (
    <S.Bottom>
      <span>{title}</span>
      <DatePicker
        disabled={disabled}
        disabledDate={(date) =>
          isBetwin
            ? !moment(date).isBetween(moment(disableDate), moment(disableDate).add('d', 8))
            : moment(disableDate).isBefore()
        }
        value={value ? moment(value) : undefined}
        onChange={(e) =>
          saveName && handleOnChange ? handleOnChange(saveName, moment(e).format('YYYY-MM-DD')) : ''
        }
      />
    </S.Bottom>
  );
}
