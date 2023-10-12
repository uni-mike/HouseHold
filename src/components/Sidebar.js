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
      label: 'Assets',
      onClick: () => navigate('/assets'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users'),
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        localStorage.removeItem('userToken');
        navigate('/login');
      },
    },
  ];

  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{
        position: "fixed",
        left: 0,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;





