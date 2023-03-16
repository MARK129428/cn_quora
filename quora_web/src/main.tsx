import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { RootModelProvider } from '@model/rootModel';
import App from './App';
import './index.scss';
import 'bytemd/dist/index.css';
import 'antd/dist/reset.css';

const root = document.getElementById('app');
const app = createRoot(root!);

app.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
      },
    }}
  >
    <RootModelProvider>
      <Router>
        <App />
      </Router>
    </RootModelProvider>
  </ConfigProvider>,
);
