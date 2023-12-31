import { DatePicker, TimePicker } from 'antd';
import * as S from '../style';
import moment from 'moment';

type Props = {
  titles: string[];
  title: string;
  values?: any[];
  saveNames?: string[];
  essential?: boolean;
  timePicker?: boolean;
  disable?: boolean;
  handleChange?: (key: string, value: any) => void;
};

export function InputDate({
  titles,
  title,
  saveNames,
  disable,
  values,
  essential = true,
  timePicker = false,
  handleChange,
}: Props) {
  return (
    <S.DateInputBody>
      <S.Flex>
        <S.AddTitle>
          {essential && <S.Red>*</S.Red>}
          {title}
        </S.AddTitle>
        <S.DateInputContainer key={title}>
          {titles.map((title, idx) => (
            <S.DateInputWrap key={idx}>
              <S.DateInputTitle>{title} :</S.DateInputTitle>
              {timePicker ? (
                <TimePicker
                  value={values && values[idx]}
                  onChange={(v) => {
                    handleChange &&
                      saveNames &&
                      handleChange(saveNames[idx], moment(v).format('HH:mm'));
                  }}
                  disabled={disable && true}
                  format={'HH:mm'}
                  style={{ width: '12vw' }}
                />
              ) : (
                <DatePicker
                  defaultValue={undefined}
                  value={values && values[idx] ? values[idx] : undefined}
                  disabled={disable && true}
                  onChange={(v) => {
                    handleChange &&
                      saveNames &&
                      handleChange(saveNames[idx], moment(v).format('YYYY-MM-DD'));
                  }}
                  style={{ width: '12vw' }}
                />
              )}
            </S.DateInputWrap>
          ))}
        </S.DateInputContainer>
      </S.Flex>
    </S.DateInputBody>
  );
}
