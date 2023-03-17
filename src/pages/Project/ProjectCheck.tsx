import { useEffect, useState } from 'react';
import { Divider, Form, Input, notification, Table } from 'antd';
import * as S from './style';
import moment from 'moment';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FIND_MANY_PROJECT_BY_ADMIN } from '../../graphql/query';
import { projectCheckColumns } from '../../utils/columns';
import { useNavigate } from 'react-router-dom';
import {
  FindManyProjectByAdminQuery,
  MarketStatus,
  PublicOfferingStatus,
  VoteStatus,
} from '../../graphql/generated/graphql';
import { PROJECT_IS_VISIBLE_TOGGLE_BY_ADMIN } from '../../graphql/mutation';
import { publicOfferingStatusToKind } from '../../utils/publicOfferingStatusToKind';
import { voteStatusKindToText } from '../../utils/voteStatusKindToText';

export function ProjectCheck() {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [searchText, setSearchText] = useState('');
  const [findProjectData, setFindProjectData] = useState<any[]>([]);
  const [publicOfferingStatus, setPublicOfferingStatus] = useState<
    PublicOfferingStatus | undefined
  >(undefined);
  const [marketStatus, setMarketStatus] = useState<MarketStatus | undefined>(undefined);
  const [voteStatus, setVoteStatus] = useState<VoteStatus | undefined>(undefined);
  const [isSold, setIsSold] = useState(false);

  const one = ['전체'];
  const two = ['공모예정', '공모중', '공모완료'];
  const three = ['마켓 거래중'];
  const four = ['매각투표예정', '매각투표중', '매각투표완료'];
  const five = ['매각완료', '매각중'];
  const [able, setAble] = useState<string[]>(['전체']);
  const navigator = useNavigate();

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const clickHandel = (item: string) => {
    if (item !== '전체') {
      if (able.includes(item)) {
        setPublicOfferingStatus(undefined);
        setVoteStatus(undefined);
      } else {
        setPublicOfferingStatus(
          publicOfferingStatusToKind(item) !== undefined
            ? publicOfferingStatusToKind(item)
            : publicOfferingStatus,
        );
        setVoteStatus(
          voteStatusKindToText(item) !== undefined ? voteStatusKindToText(item) : voteStatus,
        );
      }
      if (item === '마켓 거래중') {
        if (able.includes(item)) {
          setMarketStatus(undefined);
        } else {
          setMarketStatus(MarketStatus.Listed);
        }
      }
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
          if (two.includes(item)) {
            const newArr = able.filter((label) => !two.includes(label));
            newArr.push(item);
            setAble(newArr);
          } else if (four.includes(item)) {
            const newArr = able.filter((label) => !four.includes(label));
            newArr.push(item);
            setAble(newArr);
          } else {
            setAble([...able, item]);
          }
        }
      }
    } else {
      setPublicOfferingStatus(undefined);
      setVoteStatus(undefined);
      setAble([item]);
    }
  };

  const ToggleClickhandle = (id: number) => {
    projectIsVisibleToggleByAdmin({
      variables: {
        id,
      },
    });
  };

  const [findManyProjectByAdmin] = useLazyQuery<FindManyProjectByAdminQuery>(
    FIND_MANY_PROJECT_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setTotalCount(data.findManyProjectByAdmin.totalCount);
        setFindProjectData(data.findManyProjectByAdmin.projects);
      },
    },
  );

  const [projectIsVisibleToggleByAdmin] = useMutation(PROJECT_IS_VISIBLE_TOGGLE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (_data) => {
      notification.success({ message: '프로젝트의 노출여부를 수정했습니다.' });
    },
  });

  useEffect(() => {}, [able]);

  useEffect(() => {
    findManyProjectByAdmin({
      variables: {
        take,
        skip,
        searchText,
        isSold,
        publicOfferingStatus,
        voteStatus,
        marketStatus,
      },
      fetchPolicy: 'no-cache',
    });
  }, [searchText, skip, able]);

  return (
    <>
      <Divider>프로젝트 조회</Divider>
      <S.FormWrap>
        <Form layout="inline">
          <Form.Item name="searchText">
            <Input.Search
              onSearch={(e) => {
                handleSearch(e);
              }}
              enterButton
              placeholder="검색어(프로젝트명)"
            />
          </Form.Item>
        </Form>
      </S.FormWrap>
      <S.Span>Total: 총 {totalCount}개</S.Span>
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
          <S.Title>2. 마켓</S.Title>
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
          <S.Title>3. 투표</S.Title>
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
          <S.Title>4. 매각</S.Title>
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
      </S.BtnContainer>
      {/* <Calendar
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      /> */}
      <Table
        rowKey={(rec) => rec.id}
        columns={projectCheckColumns({ ToggleClickhandle })}
        scroll={{ x: 800 }}
        dataSource={findProjectData}
        onRow={(rec) => {
          return {
            onClick: () => navigator(`/project/${rec.id}`),
          };
        }}
        // loading={loading}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
      />
    </>
  );
}
