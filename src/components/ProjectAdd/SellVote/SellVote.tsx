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
  handleRefetch: () => void;
};

export function SellVote({ projectId = 1, tabsName, projectStates, handleRefetch }: Props) {
  const [totalArr, setTotalArr] = useState<number[]>([]);
  const [variables, setVariables] = useState<any>(undefined);
  const [take, setTake] = useState(1);
  const [skip, setSkip] = useState(0);
  const [voteTotalCount, setVoteTotalCount] = useState(1);
  const [voteCurrent, setVoteCurrent] = useState(0);
  const [voteState, setVoteState] = useState('매각투표 예정');

  const [findManyProjectSellVoteByAdmin] = useLazyQuery(FIND_MANY_PROJECT_SELL_VOTE_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setVoteTotalCount(data.findManyProjectSellVoteByAdmin.totalCount);
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
    if (voteTotalCount === 0) {
      setTotalArr([0]);
    } else {
      if (voteState !== undefined) {
        for (let i = 0; i < voteTotalCount; i++) {
          totalArr.push(i);
        }
      } else {
        for (let i = 0; i < voteTotalCount + 1; i++) {
          totalArr.push(i);
        }
      }
      setTotalArr(totalArr);
    }
  }, [voteTotalCount, voteState, voteCurrent]);

  return (
    <S.Container>
      <S.TitleWrap>
        {totalArr.map((number, idx) => (
          <S.Title
            style={{
              cursor: 'pointer',
              fontWeight: idx === voteCurrent ? 'bold' : 'normal',
              color: idx === voteCurrent ? 'red' : 'black',
            }}
            onClick={() => setVoteCurrent(idx)}
            key={idx}
          >
            {number + 1}차 투표
          </S.Title>
        ))}
      </S.TitleWrap>
      <SellVoteTabs
        projectId={projectId}
        variables={variables ? variables[voteCurrent] : []}
        tabsName={tabsName}
        voteState={voteState}
        voteTotalCount={voteTotalCount}
        voteCurrent={voteCurrent + 1}
        handleRefetch={handleRefetch}
      />
    </S.Container>
  );
}
