import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import Users from './components/Users';
import Sidebar from './components/Sidebar';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

const Router = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/assets" element={currentUser ? <Assets /> : <Navigate to="/login" />} />
            <Route path="/users" element={currentUser ? <Users /> : <Navigate to="/login" />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
