import { DatePicker, TimePicker } from 'antd';
import * as S from './../style';
import moment from 'moment';

type Props = {
  titles: string[];
  title: string;
  values?: string[];
  saveNames?: string[];
  essential?: boolean;
  timePicker?: boolean;
  disable?: boolean;
  handleChange?: (key: string, value: any) => void;
};

export function ProjectAddDateInput({
  titles,
  title,
  saveNames,
  disable,
  handleChange,
  values,
  essential = true,
  timePicker = false,
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
                  onChange={(v) => {
                    handleChange &&
                      saveNames &&
                      handleChange(saveNames[idx], moment(v).format('HH:mm'));
                  }}
                  disabled={disable && true}
                  format={'HH:mm a'}
                  style={{ width: '270px' }}
                />
              ) : (
                <DatePicker
                  defaultValue={values && moment(values[idx])}
                  disabled={disable && true}
                  onChange={(v) => {
                    handleChange &&
                      saveNames &&
                      handleChange(saveNames[idx], new Date(moment(v).format('YYYY-MM-DD')));
                  }}
                  style={{ width: '270px' }}
                />
              )}
            </S.DateInputWrap>
          ))}
        </S.DateInputContainer>
      </S.Flex>
    </S.DateInputBody>
  );
}
