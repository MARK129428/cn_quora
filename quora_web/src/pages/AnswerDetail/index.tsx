import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IQuestion } from '@page/User/Question';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';

function AnswerDetail() {
  const { id }: { id :string } = useParams();
  const [question, setQuestion] = useState<IQuestion>();
  const init = useCallback(async () => {
    const { data } = await getQuestion(+id);
    setQuestion(data);
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1 className={styles['question-title']}>{question?.Content}</h1>
    </div>
  );
}

export default AnswerDetail;
