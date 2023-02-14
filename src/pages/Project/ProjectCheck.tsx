import { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Tag, Table, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import * as S from './style';
import { Calendar } from '../../components/Calendar';
import moment from 'moment';

import { projectCheckColumns, ProjectCheckType } from '../../utils/columns/project.check';
import { useNavigate } from 'react-router-dom';

export function ProjectCheck() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const one = ['전체'];
  const two = ['공모예정', '공모중', '공모완료'];
  const three = ['상장대기'];
  const four = ['마켓 거래중'];
  const five = ['매각투표예정', '매각투표중', '매각투표완료'];
  const six = ['매각완료'];
  const [able, setAble] = useState<string[]>([]);

  const data: ProjectCheckType[] = [
    {
      id: 0,
      name: 'dawdawdaw',
      price: 'dawdawdaw',
      oneTabsPrice: 'dawdawdaw',
      tabsCount: 'dawdawdaw',
      percent: 'dawdawdaw',
      closingPrice: 'dawdawdaw',
      upDown: 'dawdawdaw',
      saleVote: 'dawdawdaw',
      date: new Date(),
      manager: 'dawdawdaw',
      state: 'dawdawdaw',
    },
  ];

  const clickHandel = (item: string) => {
    if (item !== '전체') {
      if (able.includes('전체')) {
        setAble([item]);
      } else {
        if (able.includes(item)) {
          setAble(
            able.filter(function (f) {
              return f !== item;
            }),
          );
        } else {
          setAble([...able, item]);
        }
      }
    } else {
      setAble([item]);
    }
  };

  useEffect(() => {}, [able]);
  const navigator = useNavigate();

  return (
    <>
      <Divider>프로젝트 조회</Divider>
      <S.FormWrap>
        <Form layout="inline">
          <Form.Item name="searchText">
            <Input.Search enterButton placeholder="검색어(문의내용, 닉네임)" />
          </Form.Item>
        </Form>
        <Button
          onClick={() => navigator('/project/add')}
          type="primary"
          style={{ marginRight: '0' }}
        >
          등록하기
        </Button>
      </S.FormWrap>
      <S.Span>Total: 총 00개</S.Span>
      <S.BtnContainer>
        <S.BtnWrap>
          <S.Title>0. 기타</S.Title>
          {one.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
        <S.BtnWrap>
          <S.Title>1. 공모</S.Title>
          {two.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
        <S.BtnWrap>
          <S.Title>2. 상장</S.Title>
          {three.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
        <S.BtnWrap>
          <S.Title>3. 마켓</S.Title>
          {four.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
        <S.BtnWrap>
          <S.Title>4. 투표</S.Title>
          {five.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
        <S.BtnWrap>
          <S.Title>5. 매각</S.Title>
          {six.map((item, idx) => (
            <S.Btn
              style={{
                backgroundColor: `${able.includes(item) ? '#5d28dd' : 'white'}`,
                color: `${able.includes(item) ? 'white' : 'black'}`,
              }}
              onClick={() => clickHandel(item)}
              key={idx}
            >
              {item}
            </S.Btn>
          ))}
        </S.BtnWrap>
      </S.BtnContainer>
      <Calendar
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      <Table
        rowKey={(rec) => rec.id}
        columns={projectCheckColumns}
        scroll={{ x: 800 }}
        // dataSource={inquiryData}
        dataSource={data.reverse()}
        // loading={loading}
        pagination={{ position: ['bottomCenter'] }}
      />
    </>
  );
}
