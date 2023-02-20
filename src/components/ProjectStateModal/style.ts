import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 350px;
  height: 70vh;
  position: fixed;
  right: 50px;
  z-index: 2;
  border: solid 1px black;
  font-size: 23px;
  font-weight: bold;
  padding: 20px;
  background-color: white;
  hr {
    height: 3px;
    background-color: black;
    margin: 20px 0;
  }
`;

export const Title = styled.div``;

export const ProjectStateContainer = styled.div`
  font-weight: normal;
`;

export const ProjectState = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const State = styled.span`
  color: blue;
`;
