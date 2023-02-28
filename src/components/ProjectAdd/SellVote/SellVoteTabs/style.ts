import styled from 'styled-components';

export const Container = styled.div`
  width: 1250px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

export const Btns = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-top: 15px;
  border-bottom: 2px solid black;
  justify-content: center;
  width: 150px;
`;

export const DividendCycle = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
`;

export const Left = styled.div`
  div {
    border-bottom: solid 1px black;
    width: 230px;
    padding: 10px 45px;
    font-weight: bold;
  }
  div:last-child {
    border-bottom: none;
  }
`;

export const Right = styled.div`
  div {
    border: solid 1px black;
    width: 900px;
    border-top: none;
    border-right: none;
    padding: 10px 45px;
  }
  div:last-child {
    border-bottom: none;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const Bar = styled.div`
  background-color: #d9d9d9;
  height: 50px;
  margin-bottom: 30px;
`;

export const BarState = styled.div`
  height: 100%;
  background-color: blue;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  font-weight: bold;
`;
