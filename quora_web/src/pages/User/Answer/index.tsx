import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ArticleCard from '@component/ArticleCard';
import { deleteAnswer, getAllAnswerByUserId } from '@/api/answer';
import styles from './index.module.scss';

export interface IAnswer {
  id?: number,
  title?: string,
  Content?: string,
  UserId?: string,
  QuestionId?: number,
}
function Answer() {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const init = useCallback(async () => {
    const { data } = await getAllAnswerByUserId();
    setAnswers(data);
  }, []);
  useEffect(() => {
    init();
  }, []);
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

  return (
    <div>
      <ul className={styles['article-wrapper']}>
        {answers?.map((item: IAnswer) => {
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
    </div>
  );
}

export default Answer;
