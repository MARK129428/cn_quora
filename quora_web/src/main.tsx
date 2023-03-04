import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
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
    <App />
  </ConfigProvider>,
);
