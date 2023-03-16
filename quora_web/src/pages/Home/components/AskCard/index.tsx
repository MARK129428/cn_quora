import { ChangeEventHandler, useState } from 'react';
import {
  Avatar,
  Space,
  Input,
  Modal,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import WenHao from '@/assets/img/wenhao.svg';
import Answer from '@/assets/img/answer.svg';
import Blog from '@/assets/img/blog.svg';
import { createQuestion } from '@/api/question';

const { TextArea } = Input;

function AskCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [textValue, setTextValue] = useState('');
  const handleOk = async () => {
    if (textValue !== '') {
      const response = await createQuestion(textValue);
      console.log(response);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className={styles['askCard-wrapper']}>
      <Modal title="请输入问题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea
          value={textValue}
          rows={4}
          placeholder="maxLength is 6"
          maxLength={200}
          onChange={(e) => { handleTextAreaChange(e); }}

        />
      </Modal>
      <div
        tabIndex={0}
        role="button"
        onClick={showModal}
        onKeyUp={() => {}}
      >
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Input className={styles['askCard-input']} placeholder="你想问啥？" />
        </Space>
      </div>
      <div className={styles['askCard-Btns']}>
        <div
          tabIndex={0}
          role="button"
          onClick={showModal}
          onKeyUp={() => {}}
        >
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
          <Link to="/article">
            <Space>
              <img src={Blog} alt="文章" />
              <span>文章</span>
            </Space>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AskCard;
