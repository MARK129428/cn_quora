import { Avatar, Space, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import WenHao from '@/assets/img/wenhao.svg';
import Answer from '@/assets/img/answer.svg';
import Blog from '@/assets/img/blog.svg';

function AskCard() {
  return (
    <div className={styles['askCard-wrapper']}>
      <div>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Input className={styles['askCard-input']} placeholder="你想问啥？" />
        </Space>
      </div>
      <div className={styles['askCard-Btns']}>
        <div>
          <Space>
            <img src={WenHao} alt="提问" />
            <span>提问</span>
          </Space>
        </div>
        |
        <div>
          <Link to="/answer">
            <Space>
              <img src={Answer} alt="回答" />
              <span>回答</span>
            </Space>
          </Link>
        </div>
        |
        <div>
          <Space>
            <img src={Blog} alt="文章" />
            <span>文章</span>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default AskCard;
