import { useCallback, useEffect, useState } from 'react';
import { IQuestion } from '@page/User/Question';
import QuestionCard from '@component/QuestionCard';
import { getAllQuestions, postQuestionLike } from '@/api/question';
import styles from './index.module.scss';

function Answer() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [likeIds, setLikeIds] = useState<Set<number>>(new Set());
  const [dislikeIds, setDislikeIds] = useState<Set<number>>(new Set());
  const init = useCallback(async () => {
    const { data } : { data: IQuestion[] } = await getAllQuestions();
    setQuestions(data);
  }, []);
  useEffect(() => {
    init();
    return () => {
      // 离开时发送请求给后端
      postQuestionLike({
        likeIds,
        dislikeIds,
      }).then((res) => {
        console.log(res);
      });
    };
  }, []);
  const handleLike = (id: number) => {
    setLikeIds(likeIds.add(id));
  };
  const handleDislike = (id: number) => {
    setDislikeIds(dislikeIds.add(id));
  };
  return (
    <div className={styles['answer-wrapper']}>
      <ul>
        {
          questions?.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {}}
                role="presentation"
              >
                <QuestionCard
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...item}
                  handleUserLike={handleLike}
                  handleUserDislike={handleDislike}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Answer;
