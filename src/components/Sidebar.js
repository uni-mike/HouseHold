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
      theme="light"
      style={{
        position: "fixed",
        left: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ borderRight: 0 }}
        items={menuItems}
      />
      <style>
{`
          .ant-layout-sider {
            background: transparent !important;
          }
        `}
      </style>
    </Sider>
  );
};

export default Sidebar;
