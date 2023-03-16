import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Space,
} from 'antd';
import { useRootStore } from '@model/rootModel';
import { useCallback, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { SignUpMsg } from '@page/SignUp';
import styles from './index.module.scss';

function Info() {
  const { userModel } = useRootStore();
  const { email, username, changeUser } = userModel;
  const [editable, setEditabele] = useState(true);
  const handleDisable = useCallback(() => {
    setEditabele(!editable);
  }, [editable]);
  const onFinish = useCallback((values: SignUpMsg) => {
    changeUser(values);
    setEditabele(true);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
  }, []);

  return (
    <>
      <h2>个人资料</h2>
      <Divider />
      <div className={styles.avatar}>
        <Avatar size={84} icon={<UserOutlined />} />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true, username, email }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={editable}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button size="large" disabled={false} onClick={handleDisable}>
              修改
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default Info;
