import { Button, Space } from 'antd';
import styles from './index.module.scss';

export interface ArticleCardProps {
  id: number;
  title: string;
  deleteItem: Function;
  changeItem: Function;
}

function ArticleCard({
  id,
  title,
  deleteItem,
  changeItem,
} : ArticleCardProps) {
  return (
    <div className={styles['ArticleCard-wrapper']}>
      <div className={styles.id}>{id}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.ctrl}>
        <Space>
          <Button onClick={() => { deleteItem(id); }} type="primary" danger>删除</Button>
          <Button onClick={() => { changeItem(id); }} type="primary">修改</Button>
        </Space>
      </div>
    </div>
  );
}

export default ArticleCard;
