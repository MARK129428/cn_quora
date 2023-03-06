import { useHistory, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Input, Button, Space } from 'antd';
import { ChangeEventHandler, MouseEventHandler} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Header from '@component/Header';
import Logo from '@/assets/img/logo.svg';
import routes from './router/route';
import './index.scss';

function APP() {
  const history = useHistory();
  // input框改变
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // console.log(e.target.value);
  };
  const handleLogoClick: MouseEventHandler<HTMLDivElement> = () =>{
    history.push('/');
  };
  return (
    <div>
      <Header>
        <div
          onClick={handleLogoClick}
          onKeyDown={undefined}
          role="button"
          tabIndex={0}
        >
          <img src={Logo} alt="logo" />
        </div>
        <div>
          <Input
            placeholder="请输入搜索内容"
            allowClear
            width="400px"
            prefix={<SearchOutlined />}
            onChange={handleChange}
          />
        </div>
        <div>
          <Space>
            <Button>登录</Button>
            <Button>注册</Button>
          </Space>
        </div>
      </Header>
      <main style={{ marginTop: '64px', padding: '0 260px 0 240px' }}>
        {renderRoutes(routes)}
      </main>
    </div>
  );
}

export default withRouter(APP);
