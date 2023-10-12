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

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DatabaseOutlined />} onClick={() => navigate('/assets')}>
          Assets
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/users')}>
          Users
        </Menu.Item>
        <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => {
          localStorage.removeItem('userToken');
          navigate('/login');
        }}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
