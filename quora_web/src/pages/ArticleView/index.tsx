import { useCallback, useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useParams } from 'react-router';
import { Editor, Viewer } from '@bytemd/react';
import { getArticle } from '@/api/article';
import styles from './index.module.scss';

function ArticleView() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams<{id: string}>();
  const init = useCallback(async () => {
    if (id) {
      const { data: { title: getTitle, Content: getContent } } = await getArticle(id);
      setValue(getContent);
      setTitle(getTitle);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles['view-wrapper']}>
      <h1 className={styles.title}>{title}</h1>
      <Divider />
      <Viewer value={value} />
    </div>
  );
}

export default ArticleView;
