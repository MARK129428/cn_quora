import { useCallback, useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import { useHistory } from 'react-router';
import { IQuestion } from '@page/User/Question';
import QuestionCard from '@component/QuestionCard';
import { getAllQuestions, postQuestionLike } from '@/api/question';
import styles from './index.module.scss';

function Answer() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [likeIds, setLikeIds] = useState<Set<number>>(new Set());
  const [dislikeIds, setDislikeIds] = useState<Set<number>>(new Set());
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data, total } : { data: IQuestion[], total: number } = await getAllQuestions({
      page: current - 1,
      limit: 10,
    });
    setTotal(total);
    setQuestions(data);
  }, [current]);
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
  }, [current]);
  const handleLike = (id: number) => {
    setLikeIds(likeIds.add(id));
  };
  const handleDislike = (id: number) => {
    setDislikeIds(dislikeIds.add(id));
  };
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  const history = useHistory();
  return (
    <div className={styles['answer-wrapper']}>
      <ul>
        {
          questions?.map((item) => {
            return (
              <li
                key={item.id}
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
      <div>
        <Pagination current={current} onChange={onChange} total={totalNum} />
      </div>
    </div>
  );
}

export default Answer;
