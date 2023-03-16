import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import ArticleCard from '@component/ArticleCard';
import { Divider } from 'antd';
import { IArticle } from '@page/Article';
import { deleteArticle, getUserArticle } from '@/api/article';
import styles from './index.module.scss';
import { useHistory } from 'react-router';

function Article() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const init = useCallback(async () => {
    const { data } : {data:IArticle[]} = await getUserArticle();
    setArticles(data);
  }, []);
  useEffect(() => {
    init();
  }, []);
  const deleteItem = useCallback(async (id: number) => {
    await deleteArticle(id);
    init();
  }, []);

  const history = useHistory();
  const changeItem = useCallback((id: number) => {
    history.push(`/article/${id}`);
  }, []);

  const handleItemClick = useCallback((id: number) => {
    history.push(`/articleview/${id}`);
  }, []);

  return (
    <ul className={styles['article-wrapper']}>
      {articles?.map((item: IArticle) => {
        return (
          <li
            role="presentation"
            key={`${item.id}`}
            onClick={() => { handleItemClick(item.id!); }}
          >
            <ArticleCard
              title={item.title!}
              id={item.id!}
              deleteItem={deleteItem}
              changeItem={changeItem}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Article;
