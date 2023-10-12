import React from 'react';
import Router from './Router';
import { AuthProvider } from './AuthContext';
import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="App">
              <Router />
            </div>
          </Content>
        </Layout>
      </Layout>
    </AuthProvider>
  );
}

export default App;
