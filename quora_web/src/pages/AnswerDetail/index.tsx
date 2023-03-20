import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IQuestion } from '@page/User/Question';
import { IAnswer } from '@page/User/Answer';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';
import { getAllAnswerByQuestionId } from '@/api/answer';

function AnswerDetail() {
  const { questionId }: { questionId :string } = useParams();
  const [question, setQuestion] = useState<IQuestion>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const init = useCallback(async () => {
    const { data: questions } : { data: IQuestion } = await getQuestion(+questionId);
    setQuestion(questions);
    const { data: allAnswers } : any = await getAllAnswerByQuestionId(questionId);
    setAnswers(allAnswers);
  }, []);

  useEffect(() => {
    init();
  }, []);
  const history = useHistory();
  const handleItemClick = useCallback((id: number) => {
    history.push(`/answerview/${id}`);
  }, []);
  return (
    <div className={styles['answer-detail']}>
      <h1 className={styles['question-title']}>{question?.Content}</h1>
      <h2>回答:</h2>
      <ul className={styles['question-wrapper']}>
        {
          answers?.map(({ id, title }) => {
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
    </div>
  );
}

export default AnswerDetail;
