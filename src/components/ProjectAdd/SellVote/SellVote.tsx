import { useLazyQuery } from '@apollo/client';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { FIND_MANY_PROJECT_SELL_VOTE_BY_ADMIN } from '../../../graphql/query';
import { SellVoteTabs } from './SellVoteTabs/SellVoteTabs';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
  tabsName: string;
  projectStates: string[];
};

export function SellVote({ projectId = 1, tabsName, projectStates }: Props) {
  const [totalArr, setTotalArr] = useState<number[]>([]);
  const [variables, setVariables] = useState<any>(undefined);
  const [take, setTake] = useState(1);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [current, setCurrent] = useState(0);
  const [voteState, setVoteState] = useState('매각투표 예정');

  const [findManyProjectSellVoteByAdmin] = useLazyQuery(FIND_MANY_PROJECT_SELL_VOTE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyProjectSellVoteByAdmin.totalCount);
      setVariables(data.findManyProjectSellVoteByAdmin.projectSellVotes);
    },
  });

  useEffect(() => {
    findManyProjectSellVoteByAdmin({
      variables: {
        id: +projectId,
      },
      fetchPolicy: 'no-cache',
    });
    setVoteState(projectStates[2]);
  }, [projectId]);

  useEffect(() => {
    const totalArr = [];
    if (totalCount === 0) {
      setTotalArr([0]);
    } else {
      if (voteState === undefined || voteState === '매각투표 완료' || voteState === '매각투표 중') {
        for (let i = 0; i < totalCount; i++) {
          totalArr.push(i);
        }
      } else {
        for (let i = 0; i < totalCount + 1; i++) {
          totalArr.push(i);
        }
      }
      setTotalArr(totalArr);
    }
  }, [totalCount]);

  return (
    <S.Container>
      <S.TitleWrap>
        {totalArr.map((number, idx) => (
          <S.Title
            style={{
              cursor: 'pointer',
              fontWeight: idx === current ? 'bold' : 'normal',
              color: idx === current ? 'red' : 'black',
            }}
            onClick={() => setCurrent(idx)}
            key={idx}
          >
            {number + 1}차 투표
          </S.Title>
        ))}
      </S.TitleWrap>
      <SellVoteTabs
        projectId={projectId}
        variables={variables ? variables[current] : []}
        tabsName={tabsName}
        voteState={voteState}
        totalCount={totalCount}
        current={current + 1}
        setVariables={setVariables}
      />
    </S.Container>
  );
}
