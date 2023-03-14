import { useHistory, withRouter, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Input, Button, Space, Avatar } from 'antd';
import ReactLoading from 'react-loading';
import { ChangeEventHandler, MouseEventHandler, Suspense} from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Header from '@component/Header';
import Logo from '@/assets/img/logo.svg';
import routes from './router/route';

function APP() {
  const history = useHistory();
  // input框改变
  const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
    // console.log(e.target.value);
  };
  const handleLogoClick: MouseEventHandler<HTMLDivElement> = () => {
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
            {
              localStorage.getItem('token')
                ? (
                  <Link to="/user">
                    <Avatar icon={<UserOutlined />} />
                  </Link>
                )
                : (
                  <>
                    <Link to="/signin">
                      <Button>登录</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>注册</Button>
                    </Link>
                  </>
                )
            }
          </Space>
        </div>
      </Header>
      <main style={{ marginTop: '64px', padding: '0 260px 0 240px' }}>
        <Suspense fallback={<ReactLoading />}>
          {renderRoutes(routes)}
        </Suspense>
      </main>
    </div>
  );
}

export default withRouter(APP);
