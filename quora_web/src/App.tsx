import { useHistory, withRouter, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {
  Input,
  Button,
  Space,
  Avatar,
  List,
  Typography,
} from 'antd';
import ReactLoading from 'react-loading';
import {
  ChangeEventHandler,
  MouseEventHandler,
  Suspense,
  useState,
} from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Header from '@component/Header';
import { IQuestion } from '@page/User/Question';
import Logo from '@/assets/img/logo.svg';
import routes from './router/route';
import { getSearchQuestion } from './api/question';
import debounce from './utils/debounce';

function APP() {
  const history = useHistory();
  const [searchRes, setSearchRes] = useState<IQuestion[]>([]);
  const [str, setStr] = useState('');
  // input框改变
  const handleChange: ChangeEventHandler<HTMLInputElement> = debounce(async (e: any) => {
    setStr(e.target.value.trim());
    if (e.target.value.trim() === '') return;
    const { data } : any = await getSearchQuestion({
      q: str,
    });
    setSearchRes(data);
  }, 1000);
  const handleLogoClick: MouseEventHandler<HTMLDivElement> = () => {
    history.push('/');
  };
  const userSignOut:(MouseEventHandler<HTMLAnchorElement> &
     MouseEventHandler<HTMLButtonElement>) | undefined = () => {
       localStorage.removeItem('token');
       window.location.reload();
     };
  const handlerBlur = () => {
    setTimeout(() => {
      setSearchRes([]);
    }, 300);
  };
  const handlerFocus = async () => {
    if (str === '') return;
    const { data } : any = await getSearchQuestion({
      q: str,
    });
    setSearchRes(data);
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
            onBlur={handlerBlur}
            onFocus={handlerFocus}
          />
          {
            searchRes.length > 0
            && (
            <List
              style={{ position: 'absolute', background: 'white', width: '550px' }}
              header={<h2>搜索结果</h2>}
              bordered
              dataSource={searchRes}
              renderItem={(item) => {
                return (
                  <List.Item
                    onClick={() => { history.push(`/answer/${item.id}`); }}
                  >
                    {`${item.id}-${item.Content}`}
                  </List.Item>
                );
              }}
            />
            )
          }
        </div>
        <div>
          <Space>
            {
              localStorage.getItem('token')
                ? (
                  <Space>
                    <Link to="/user/answer">
                      <Avatar icon={<UserOutlined />} />
                    </Link>
                    <Button onClick={userSignOut}>退出</Button>
                  </Space>
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
          <>
            {renderRoutes(routes)}
          </>
        </Suspense>
      </main>
    </div>
  );
}

export default withRouter(APP);
