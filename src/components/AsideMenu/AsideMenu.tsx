import { useLayoutEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import * as S from './style';

type MenuInfo = {
  key: string;
  keyPath: string[];
};

type MenuData = {
  item: string;
  subMenu?: string;
};

type Props = {
  removeCookie: (name: 'login' | 'time') => void;
};

export function AsideMenu({ removeCookie }: Props) {
  const [menu, setMenu] = useState<MenuData>({
    item: '',
    subMenu: '',
  });

  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    removeCookie('login');
    removeCookie('time');
    window.location.replace('/');
  };

  const handleMoveHome = () => {
    navigator('/');
  };

  const handleClickMenu = (e: MenuInfo) => {
    const [item, subMenu] = e.keyPath;
    if (subMenu) {
      const [, path] = item.split('-');
      setMenu({
        item,
        subMenu,
      });
      return navigator(`/${subMenu}/${path}`);
    } else {
      if (item === 'dashboard') {
        return handleMoveHome();
      }
      if (item === 'logout') {
        return handleLogout();
      }
      setMenu({
        item,
        subMenu: '',
      });
      return navigator(`/${item}`);
    }
  };

  const handleChangeSubMenu = (openKeys: string[]) => {
    if (openKeys.length < 1) {
      return setMenu((prev) => ({ ...prev, subMenu: '' }));
    }

    const [, subMenu] = openKeys;
    setMenu((prev) => ({ ...prev, subMenu }));
  };

  useLayoutEffect(() => {
    const [, subMenu, item] = pathname.split('/');
    if (!subMenu.length) {
      return setMenu({ item: 'dashboard', subMenu: '' });
    }
    if (!item) {
      return setMenu({ item: subMenu, subMenu: '' });
    }

    setMenu({ item: `${subMenu}-${item}`, subMenu });
  }, [pathname]);

  return (
    <S.Sider>
      <S.ImageWrap onClick={handleMoveHome}>
        <S.Image alt="logo" src={'/img/logo.png'} />
      </S.ImageWrap>

      <Menu
        theme="dark"
        mode="inline"
        onClick={handleClickMenu}
        onOpenChange={handleChangeSubMenu}
        openKeys={[menu.subMenu ?? '']}
        selectedKeys={[menu.item]}
      >
        <Menu.Item icon={<LineChartOutlined />}>대시보드</Menu.Item>
        <Menu.Item key={'admin'} icon={<SecurityScanOutlined />}>
          관리자 설정
        </Menu.Item>
        <Menu.SubMenu key={'users'} title="회원관리" icon={<UserOutlined />}>
          <Menu.Item key={'users-columns'}>회원목록</Menu.Item>
          <Menu.Item key={'users-change'}>자격변경 신청</Menu.Item>
          <Menu.Item key={'users-classifi'}>회원분류</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={'project'} title="프로젝트관리" icon={<ProjectOutlined />}>
          <Menu.Item key={'project-check'}>프로젝트 조회</Menu.Item>
          <Menu.Item key={'project-add'}>프로젝트 등록</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={'customer'} title="고객센터" icon={<CustomerServiceOutlined />}>
          <Menu.Item key={'customer-inquiry'}>1:1 문의</Menu.Item>
          <Menu.Item key={'customer-faq'}>FAQ 관리</Menu.Item>
          <Menu.Item key={'customer-notice'}>공지사항 관리</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key={'policy'} icon={<FormOutlined />}>
          약관관리
        </Menu.Item>
        <Menu.Item key={'setting'} icon={<SettingOutlined />}>
          전체 설정
        </Menu.Item>
        <Menu.Item key={'logout'} icon={<LogoutOutlined />}>
          로그아웃
        </Menu.Item>
      </Menu>
    </S.Sider>
  );
}
