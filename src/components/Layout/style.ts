import styled from 'styled-components';
import { Layout as AntdLayout } from 'antd';
import { PRIMARY } from '../../styles/colors';

const { Sider: AntdSider, Content: AntdContent, Footer: AntdFooter } = AntdLayout;

export const Container = styled.div`
  height: 100vh;
`;

type LayoutProps = {
  $marginLeft?: number;
};
export const Layout = styled(AntdLayout)<LayoutProps>`
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : 0)}px;
  min-height: 100vh;
  @media only screen and (max-width: 740px) {
    margin-left: 0px;
  }
`;

export const Sider = styled(AntdSider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

export const Content = styled(AntdContent)`
  margin: 0px 16px 0px;
  overflow: initial;
`;

export const Footer = styled(AntdFooter)`
  text-align: center;
`;

export const StatusBar = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 768px) {
    height: auto;
    box-shadow: none;
    background: transparent;
    margin-top: 70px;
    z-index: 0;
    position: relative;
  }
`;

export const StatusWrap = styled.div`
  margin-left: 30px;
  @media only screen and (max-width: 768px) {
    margin: 0;
    margin-right: 15px;
  }
`;

export const NoticeContainer = styled.div`
  position: relative;
  display: flex;
`;

export const NoticeWrap = styled.div`
  padding: 10px;
  display: flex;
  color: #fff;
  position: relative;
  margin: auto 15px;
`;

export const Notice = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5d28dd;
  cursor: pointer;
`;

export const Num = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: red;
  z-index: 2;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  right: 0;
  top: 0%;
`;

export const Time = styled.div`
  padding: 10px;
  background-color: ${PRIMARY};
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 8px; */
  color: #fff;
  margin-right: 20px;
  border-radius: 7px;
`;
