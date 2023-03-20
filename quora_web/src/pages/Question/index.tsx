import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router';
import { IQuestion } from '@page/User/Question';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';

function Question() {
  const { id } = useParams<{id:string}>();
  // const [question, setQuestion] = useState<IQuestion>({});
  // const init = useCallback(async () => {
  //   const { data } : {data: IQuestion} = await getQuestion(+id);
  //   setQuestion(data);
  // }, []);

  // useEffect(() => {
  //   init();
  // }, []);
  return (
    <div>
      <Redirect to={`/answer/${id}`} />
    </div>
  );
}

export default Question;
