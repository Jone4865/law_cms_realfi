import { Button } from 'antd';
import { useState } from 'react';
import * as S from './style';
type Props = {
  state?: string;
};

export function ProjectStateModal({ state }: Props) {
  const [nowAble, setNowAble] = useState('1. 공모예정');
  const projectState = [
    '1. 공모예정',
    '2. 공모 중',
    '3. 공모완료',
    '4. 상장대기',
    '5. 마켓거래중',
    '6. 매각투표 예정',
    '7. 매각투표 중',
    '8. 매각투표완료',
    '9. 매각 완료',
  ];
  return (
    <S.ModalContainer>
      <S.Title>
        프로젝트의 현재 상태는 <br />
        <S.State>[{state}]</S.State>
        <br />
        입니다.
      </S.Title>
      <hr />
      <S.ProjectStateContainer>
        {projectState.map((item, idx) => (
          <S.ProjectState
            style={{
              color: nowAble === item ? 'blue' : 'black',
              fontWeight: nowAble === item ? 'bold' : 'normal',
            }}
            key={idx}
          >
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
