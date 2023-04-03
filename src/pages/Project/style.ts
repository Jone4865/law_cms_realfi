import styled from 'styled-components';

export const FormWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Span = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const BtnContainer = styled.div`
  display: flex;
  margin-top: 20px;
  overflow: scroll;
`;

export const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const Btn = styled.div`
  width: 150px;
  height: 40px;
  border: solid 1px #5d28dd;
  border-radius: 8px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

export const TopBtns = styled.div`
  display: flex;
`;

export const AddBtn = styled.div`
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
  margin-right: 30px;
`;
