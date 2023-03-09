import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  display: flex;
`;

export const Wrap = styled.div`
  margin-right: 100px;
`;

export const SubTitle = styled.p`
  margin: 10px 0;
`;

export const BottomWrap = styled.div`
  display: flex;
`;

export const LeftWrap = styled.div``;

export const Left = styled.div`
  width: 100px;
  padding: 5px;
  border-bottom: solid 1px black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  &:last-child {
    border: none;
  }
`;

export const RightWrap = styled.div``;

export const Right = styled.div`
  width: 200px;
  padding: 5px;
  border-bottom: solid 1px black;
  border-left: solid 1px black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  &:last-child {
    border-bottom: none;
  }
`;

export const Flex = styled.div`
  display: flex;
  font-weight: bold;
`;

export const DividendBox = styled.p`
  width: 120px;
  height: 50px;
  border: solid 1px black;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const DividendBoxRight = styled.p`
  display: flex;
  align-items: center;
  font-size: 20px;
  height: 50px;
`;
