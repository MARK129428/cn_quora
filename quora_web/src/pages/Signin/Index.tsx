import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router';
import { useRootStore } from '@model/rootModel';
import { SignUpMsg } from '@page/SignUp';
import styles from './index.module.scss';

function SignIn() {
  const history = useHistory();
  const { userModel } = useRootStore();
  const onFinish = useCallback(async (values: any) => {
    const signUpMsg: SignUpMsg = {
      username: values.username,
      password: values.password,
    };
    const { loadUser } = userModel;
    const response = await loadUser(signUpMsg);
    console.log(response);
    history.push('/');
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);
  return (
    <div className={styles['SignIn-wrapper']}>
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" size="large" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
