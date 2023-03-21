import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IQuestion } from '@page/User/Question';
import { IAnswer } from '@page/User/Answer';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';
import { getAllAnswerByQuestionId } from '@/api/answer';
import { Pagination, PaginationProps } from 'antd';

function AnswerDetail() {
  const { questionId }: { questionId :string } = useParams();
  const [question, setQuestion] = useState<IQuestion>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data: questions } : { data: IQuestion } = await getQuestion(+questionId);
    setQuestion(questions);
    const { data: allAnswers, total } : any = await getAllAnswerByQuestionId(questionId, {
      page: current - 1,
      limit: 10,
    });
    setTotal(total);
    setAnswers(allAnswers);
  }, [current]);

  useEffect(() => {
    init();
  }, [current]);
  const history = useHistory();
  const handleItemClick = useCallback((id: number) => {
    history.push(`/answerview/${id}`);
  }, []);
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  return (
    <div className={styles['answer-detail']}>
      <h1 className={styles['question-title']}>{question?.Content}</h1>
      <h2>回答:</h2>
      <ul className={styles['question-wrapper']}>
        {
          answers && answers?.map(({ id, title }) => {
            return (
              <li
                role="presentation"
                key={`${id}`}
                onClick={() => { handleItemClick(id!); }}
              >
                <div className={styles.id}>{id}</div>
                <div className={styles.title}>{title}</div>
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

export default AnswerDetail;
