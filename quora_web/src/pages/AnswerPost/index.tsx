import {
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
} from 'react';
import { useHistory, useParams } from 'react-router';
import { message } from 'antd';
import KEditor from '@component/Editor';
import { IQuestion } from '@page/User/Question';
import { getQuestion } from '@/api/question';
import styles from './index.module.scss';
import { changeAnswer, getAnswerById, postAnswer } from '@/api/answer';
import useQuery from '@/hooks/useQuery';

function AnswerPost() {
  const { questionId } : { questionId:string} = useParams();
  const answerId = useQuery().get('answerId');
  const [question, setQuestion] = useState<IQuestion>({});
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const init = useCallback(async () => {
    const { data } = await getQuestion(+questionId);
    setQuestion(data);
    if (answerId) {
      const { data: answer } : any = await getAnswerById(answerId);
      setTitle(answer.title!);
      setTextContent(answer.Content!);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);
  const handleTitleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTitle(e.target.value);
  }, []);
  const handleEditorChange = useCallback((value: string) => {
    setTextContent(value);
  }, []);
  const history = useHistory();
  const handleSubmit = useCallback(async () => {
    if (title === '' || textContent === '') {
      message.error('标题或内容不能为空');
      return;
    }
    if (!answerId) {
      await postAnswer({
        title,
        content: textContent,
      }, questionId);
    } else {
      const res = await changeAnswer({
        title,
        content: textContent,
      }, answerId);
    }
    setTimeout(() => {
      history.go(-1);
    }, 1000);
  }, [title, textContent]);
  return (
    <div>
      <h1 className={styles.title}>{question.Content}</h1>
      <KEditor
        title={title}
        value={textContent}
        handleTitleChange={handleTitleChange}
        handleEditorChange={handleEditorChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AnswerPost;
