import { Button } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { marketStatusToText } from '../../utils/marketStatusToText';
import { publicOfferingStatusToText } from '../../utils/publicOfferingStatusToText';
import { voteStatusToText } from '../../utils/voteStatusToText';
import * as S from './style';

type Props = {
  variables: any;
  setProjectState: React.Dispatch<React.SetStateAction<string[]>>;
  nowProjectState: string[];
};

export function ProjectStateModal({ variables, setProjectState, nowProjectState }: Props) {
  const projectStates = [
    '공모예정',
    '공모 중',
    '공모완료',
    '상장대기',
    '마켓거래중',
    '매각투표 예정',
    '매각투표 중',
    '매각투표완료',
    '매각 완료',
  ];

  useEffect(() => {
    setProjectState([
      marketStatusToText(variables.marketStatus),
      publicOfferingStatusToText(variables.publicOfferingStatus),
      voteStatusToText(variables.voteStatus),
    ]);
  }, [variables.publicOfferingStatus, variables.marketStatus, variables.voteStatus]);
  console.log(nowProjectState.length);
  return (
    <S.ModalContainer>
      <S.Title>
        프로젝트의 현재 상태는 <br />
        <S.State>
          [
          {nowProjectState.map((text, idx) => (
            <p key={idx}>
              {text}
              {idx < nowProjectState.length - 1 && '/'}
            </p>
          ))}
          ]
        </S.State>
        <br />
        입니다.
      </S.Title>
      <hr />
      <S.ProjectStateContainer>
        {projectStates.map((item, idx) => (
          <S.ProjectState
            style={{
              color: nowProjectState.includes(item) ? 'blue' : 'black',
              fontWeight: nowProjectState.includes(item) ? 'bold' : 'normal',
            }}
            key={idx}
          >
            {idx + 1 + '. '}
            {item}
          </S.ProjectState>
        ))}
      </S.ProjectStateContainer>
      <hr />
      <S.BtnWrap>
        <Button type="primary">상태전환</Button>
      </S.BtnWrap>
    </S.ModalContainer>
  );
}
