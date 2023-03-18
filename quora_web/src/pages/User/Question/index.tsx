import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getUserQuestions } from '@/api/question';
import styles from './index.module.scss';

export interface IQuestion {
  id?: number;
  Content?: string;
  UserId?: number;
  LikeNum?: number;
  DislikeNum?: number;
  IsUserLike?: boolean | null;
}
function Question() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const init = useCallback(async () => {
    const { data }: { data: IQuestion[]} = await getUserQuestions();
    setQuestions(data);
  }, []);

  useEffect(() => {
    init();
  }, []);

  const history = useHistory();
  const handleItemClick = (id: number) => {
    history.push(`/question/${id}`);
  };
  return (
    <ul className={styles['question-wrapper']}>
      {
        questions?.map(({ id, Content }) => {
          return (
            <li
              role="presentation"
              key={`${id}`}
              onClick={() => { handleItemClick(id!); }}
            >
              <div className={styles.id}>{id}</div>
              <div className={styles.title}>{Content}</div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default Question;
