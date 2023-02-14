import styled from 'styled-components';

export const Title = styled.h3`
  font-weight: bold;
`;

export const BtnsWrap = styled.div`
  display: flex;
`;

export const Btn = styled.div`
  background-color: gray;
  border-radius: 8px;
  width: 100px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  height: 35px;
  align-items: center;
  color: white;
`;

export const AbleBtn = styled.div`
  background-color: #5d28dd;
  border-radius: 8px;
  width: 100px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  height: 35px;
  align-items: center;
  color: white;
`;

export const Bottom = styled.div``;

export const Charge = styled.div``;

export const ChargeWrap = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

export const ChargeInput = styled.input`
  margin: 0 10px;
`;

export const ChargeBtn = styled.div`
  margin-left: 10px;
  border-radius: 8px;
  cursor: pointer;
  border: solid 1px blue;
  background-color: blue;
  color: white;
  width: 50px;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

export const Hr = styled.hr`
  width: 340px;
  margin-left: 0;
`;

export const PopupWrap = styled.div``;

export const Settings = styled.div``;

export const SettingsWrap = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const SettingsTitle = styled.div`
  width: 120px;
  font-weight: bold;
`;

export const SettingsRight = styled.div`
  width: 300px;
  display: flex;
`;

export const SettingsDivTitle = styled.div`
  width: 350px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    margin-bottom: 10px;
  }
`;

export const SettingsInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    margin-left: 5px;
    margin-bottom: 10px;
  }
`;
