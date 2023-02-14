import styled from 'styled-components';
import { PRIMARY } from '../../styles/colors';

export const ModalTitle = styled.h2`
  color: ${PRIMARY};
  text-align: center;
  font-weight: bold;
`;

export const OtpWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OtpInput = styled.input`
  border: 1px solid ${PRIMARY};
  width: 15%;
  height: 100px;
  border-radius: 100%;
  margin: 20px 0;
  font-size: 46px;
  text-align: center;
  padding: 10px;
  &:focus-visible {
    outline: none;
    padding: 0px;
    margin: 0px;
  }
  @media only screen and (max-width: 768px) {
    width: 12vw;
    height: 12vw;
    font-size: 5vw;
  }
`;

export const ModalTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  text-align: center;
`;

export const TopTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
`;

export const OtpImageWrap = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OtpImage = styled.div`
  width: 170px;
  height: 100%;
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
`;

export const BottomTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
