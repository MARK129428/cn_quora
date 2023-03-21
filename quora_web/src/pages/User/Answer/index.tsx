import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ArticleCard from '@component/ArticleCard';
import { deleteAnswer, getAllAnswerByUserId } from '@/api/answer';
import styles from './index.module.scss';
import { Pagination, PaginationProps } from 'antd';

export interface IAnswer {
  id?: number,
  title?: string,
  Content?: string,
  UserId?: string,
  QuestionId?: number,
}
function Answer() {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data, total } : any = await getAllAnswerByUserId({
      page: current - 1,
      limit: 10,
    });
    setTotal(total);
    setAnswers(data);
  }, [current]);
  useEffect(() => {
    init();
  }, [current]);
  const deleteItem = useCallback(async (id: number) => {
    await deleteAnswer(`${id}`);
    init();
  }, []);

  const history = useHistory();
  const changeItem = useCallback((id: number, item: IAnswer) => {
    history.push(`/postanswer/${item.QuestionId}?answerId=${id}`);
  }, []);

  const handleItemClick = useCallback((id: number) => {
    history.push(`/answerview/${id}`);
  }, []);
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <div>
      <ul className={styles['article-wrapper']}>
        {answers && answers?.map((item: IAnswer) => {
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
                changeItem={(id: number) => { changeItem(id, item); }}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <Pagination current={current} onChange={onChange} total={totalNum} />
      </div>
    </div>
  );
}

export default Answer;
