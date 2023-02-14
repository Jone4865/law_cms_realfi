import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ko_KR';
import localeEn from 'antd/es/locale/en_US';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigProvider
        locale={{
          ...locale,
          Pagination: localeEn.Pagination,
        }}
      >
        <App />
      </ConfigProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
