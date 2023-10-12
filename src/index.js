import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './App';

const theme = 'light';

ReactDOM.render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
