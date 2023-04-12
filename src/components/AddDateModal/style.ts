import styled from 'styled-components';

export const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

export const Btn = styled.div`
  cursor: pointer;
  background-color: gray;
  color: white;
  border-radius: 8px;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const Bottom = styled.div`
  display: flex;
  padding-left: 50px;
  font-weight: bold;
  align-items: center;
  font-size: 18px;
  margin-bottom: 20px;
  span {
    margin-right: 20px;
    width: 100px;
  }
`;
