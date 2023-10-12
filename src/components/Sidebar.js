import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      icon: <DatabaseOutlined />,
      label: 'Assets', // Use label instead of text
      onClick: () => navigate('/assets'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Users', // Use label instead of text
      onClick: () => navigate('/users'),
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Logout', // Use label instead of text
      onClick: () => {
        localStorage.removeItem('userToken');
        navigate('/login');
      },
    },
  ];

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
