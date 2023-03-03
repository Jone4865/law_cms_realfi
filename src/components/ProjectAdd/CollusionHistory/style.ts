import styled from 'styled-components';

export const Container = styled.div`
  width: 1250px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Btns = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  width: 170px;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-top: 30px;
`;

export const CollusionStates = styled.div`
  display: flex;
  font-size: 18px;
  margin-top: 10px;
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
    display: flex;
  }
  div:last-child {
    border-bottom: none;
  }
  span {
    margin: 0 10px;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;
