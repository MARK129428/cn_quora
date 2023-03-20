import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IQuestion } from '@page/User/Question';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';

function ListItem({ id } : any) {
  const [question, setQuestion] = useState<IQuestion>({});
  const init = useCallback(async () => {
    const { data } : {data: IQuestion} = await getQuestion(+id);
    setQuestion(data);
  }, []);
  useEffect(() => {
    init();
  }, []);
  return (
    <Link to={`/answer/${id}`} className={styles.title}>{question.Content}</Link>
  );
}

export default ListItem;
