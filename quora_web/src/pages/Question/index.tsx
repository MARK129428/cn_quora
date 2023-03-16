import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IQuestion } from '@page/User/Question';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';

function Question() {
  const { id } = useParams<{id:string}>();

  const [question, setQuestion] = useState<IQuestion>({});
  const init = useCallback(async () => {
    const { data } : {data: IQuestion} = await getQuestion(+id);
    setQuestion(data)
  }, []);

  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <h1 className={styles.title}>{question.Content}</h1>
    </div>
  );
}

export default Question;
