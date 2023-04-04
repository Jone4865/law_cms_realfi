import { useEffect } from 'react';
import { marketStatusToText } from '../../utils/marketStatusToText';
import { publicOfferingStatusToText } from '../../utils/publicOfferingStatusToText';
import { voteStatusToText } from '../../utils/voteStatusToText';
import * as S from './style';

type Props = {
  variables: any;
  nowProjectState: string[];
  setProjectState: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ProjectStateModal({ variables, nowProjectState, setProjectState }: Props) {
  const projectStates = [
    '공모 예정',
    '공모 중',
    '공모완료',
    '상장대기',
    '마켓거래중',
    '매각투표 예정',
    '매각투표 중',
    '매각투표 완료',
    '매각 완료',
  ];

  useEffect(() => {
    setProjectState([
      marketStatusToText(variables.marketStatus),
      publicOfferingStatusToText(variables.publicOfferingStatus),
      variables.voteStatus && voteStatusToText(variables.voteStatus),
    ]);
  }, [variables]);

  return (
    <S.ModalContainer>
      <S.Title>
        프로젝트의 현재 상태는 <br />
        <S.State>
          [
          {nowProjectState.map(
            (text, idx) =>
              text !== undefined && (
                <p key={idx}>
                  {idx === 1 && '/'}
                  {text}
                  {idx === 1 && nowProjectState[2] !== undefined && '/'}
                </p>
              ),
          )}
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
    </S.ModalContainer>
  );
}
