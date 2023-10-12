import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import axios from './components/axiosConfig';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setCurrentUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          const response = await axios.get('/users/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.status === 200) {
            setCurrentUser(response.data);
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      }
    };

    verifyUserSession();
  }, [setCurrentUser, navigate]);

const handleLogin = async (values) => {
  try {
    const response = await axios.post('/users/login', {
      username: values.username,
      password: values.password,
    });

    if (response.status === 200) {
      setCurrentUser(response.data.user);
      localStorage.setItem('userToken', response.data.token);
      navigate('/');
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <Form form={form} onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
