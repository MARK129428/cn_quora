import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import styles from './index.module.scss';
import { userSignUp } from '@/api/user';
import { useHistory } from 'react-router';

export interface SignUpMsg {
  username: string;
  password?: string;
  email?: string
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

function SignIn() {
  const history = useHistory();
  const onFinish = async (values: any) => {
    const signUpMsg: SignUpMsg = {
      username: values.username,
      password: values.newPassword,
    };
    const response = await userSignUp(signUpMsg);
    if (response.message! === 'error') {
      message.error(response?.data || 'error');
    } else {
      message.success('注册成功');
      setTimeout(() => {
        history.push('/signin');
      }, 1000);
    }
  };
 
  return (
    <div className={styles['SignUp-wrapper']}>
      <div className={styles['login-card']}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
          <Form.Item
            label="NewPassword"
            name="newPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => {
                return {
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                };
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" size="large" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
