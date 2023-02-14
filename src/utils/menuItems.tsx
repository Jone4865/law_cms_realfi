import { ItemType } from 'antd/lib/menu/hooks/useItems';
import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const menuItems: ItemType[] = [
  {
    label: '대시보드',
    key: 'dashboard',
    icon: <LineChartOutlined />,
  },
  {
    label: '관리자 계정',
    key: 'admin',
    icon: <SecurityScanOutlined />,
  },
  {
    label: '회원관리',
    key: 'users',
    icon: <UserOutlined />,
    children: [
      {
        label: '회원목록',
        key: 'users-columns',
      },
      {
        label: '한도변경 신청',
        key: 'users-change',
      },
      {
        label: '회원분류',
        key: 'users-notice',
      },
    ],
  },
  {
    label: '프로젝트 관리',
    //이미지 수정하기
    key: 'project',
    icon: <UserOutlined />,
    children: [
      {
        label: '프로젝트 조회',
        key: 'project-check',
      },
      {
        label: '프로젝트 등록',
        key: 'preject-add',
      },
    ],
  },
  {
    label: '고객센터',
    key: 'customer',
    icon: <CustomerServiceOutlined />,
  },
  {
    label: '약관 관리',
    key: 'policy',
    icon: <FormOutlined />,
  },
  {
    label: '전체 설정',
    key: 'settings',
    icon: <LineChartOutlined />,
    //아이콘 수정하기
  },
  {
    label: '로그아웃',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];
