import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useHistory } from 'react-router';
import ArticleCard from '@component/ArticleCard';
import { Pagination, PaginationProps } from 'antd';
import { IArticle } from '@page/Article';
import { deleteArticle, getUserArticle } from '@/api/article';
import styles from './index.module.scss';

function Article() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data, total } : {data:IArticle[], total: any} = await getUserArticle({
      page: current - 1,
      limit: 10,
    });
    setArticles(data);
    setTotal(total);
  }, [current]);
  useEffect(() => {
    init();
  }, [current]);
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
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
      <ul className={styles['article-wrapper']}>
        {articles?.map((item: IArticle) => {
          return (
            <li
              role="presentation"
              key={`${item.id}`}
              onClick={() => { handleItemClick(item.id!); } }
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
      <div>
        <Pagination current={current} onChange={onChange} total={totalNum} />
      </div>
    </>
  );
}

export default Article;
