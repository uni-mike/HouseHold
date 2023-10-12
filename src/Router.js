import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import Users from './components/Users';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';

const Router = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/assets" element={currentUser ? <Assets /> : <Navigate to="/login" />} />
        <Route path="/users" element={currentUser ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
