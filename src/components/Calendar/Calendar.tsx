import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as S from './style';

type Props = {
  setEndDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  startDate: moment.Moment;
  endDate: moment.Moment;
};

export function Calendar({ setEndDate, setStartDate, startDate, endDate }: Props) {
  const [nowAble, setNowAble] = useState('당일');
  const Btns = [
    { title: '당일', add: 0, handle: 'date' },
    { title: '3일', add: 3, handle: 'date' },
    { title: '1주', add: 7, handle: 'date' },
    { title: '3주', add: 21, handle: 'date' },
    { title: '1개월', add: 1, handle: 'month' },
    { title: '2개월', add: 2, handle: 'month' },
    { title: '6개월', add: 6, handle: 'month' },
  ];

  const handelDate = (num: number, title: string) => {
    setNowAble(title);
    if (num === 0) {
      setStartDate(moment());
      setEndDate(moment());
    } else {
      setStartDate(moment(endDate).subtract(num, 'd'));
    }
  };

  const handelMonth = (num: number, title: string) => {
    setNowAble(title);
    setStartDate(moment(endDate).subtract(num, 'M'));
  };

  useEffect(() => {}, [startDate, endDate]);

  return (
    <S.Container>
      <S.Wrap>
        <S.Btns>
          {Btns.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${item.title === nowAble ? '#5d28dd' : 'gray'}`,
              }}
              onClick={() => {
                item.handle === 'date'
                  ? handelDate(item.add, item.title)
                  : handelMonth(item.add, item.title);
              }}
              key={idx}
            >
              {item.title}
            </S.Btn>
          ))}
        </S.Btns>
        <S.Calendar>
          <DatePicker
            value={startDate}
            onChange={(date: any) => {
              setStartDate(date);
              if (date > endDate) {
                setEndDate(date);
              }
            }}
            disabledDate={(date) => moment().isBefore(date)}
          />
          <S.Span>~</S.Span>
          <DatePicker
            value={endDate}
            onChange={(date: any) => {
              setEndDate(date);
              if (date < startDate) {
                setStartDate(date);
              }
            }}
            disabledDate={(date) => moment().isBefore(date)}
          />
        </S.Calendar>
      </S.Wrap>
    </S.Container>
  );
}
