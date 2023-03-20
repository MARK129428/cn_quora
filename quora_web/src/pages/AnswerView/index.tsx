import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
} from 'antd';
import { Editor, Viewer } from '@bytemd/react';
import { IAnswer } from '@page/User/Answer';
import { getAnswerById } from '@/api/answer';
import styles from './index.module.scss';
import { IComment, createComment, getCommentsByAnswerId } from '@/api/comment';

const { TextArea } = Input;
function AnswerView() {
  const { answerId } : { answerId: string } = useParams();
  const [answer, setAnswer] = useState<IAnswer>({});
  const [comment, setComment] = useState('');
  const [listData, setListData] = useState<IComment[]>([]);
  const init = useCallback(async () => {
    const { data: answerData }: { data: IAnswer } = await getAnswerById(answerId);
    setAnswer(answerData);
    const { data: comments }: { data: IComment[] } = await getCommentsByAnswerId(answerId);
    setListData(comments);
  }, []);
  useEffect(() => {
    init();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmitComment = useCallback(async () => {
    console.log(comment);
    const res = await createComment({
      answerId,
      content: comment,
    });
    init();
  }, [comment, answerId]);
  return (
    <div>
      <div className={styles['view-wrapper']}>
        <h1 className={styles.title}>{answer.title}</h1>
        <Divider />
        <Viewer value={answer.Content!} />
        <h1 className={styles.comment}>评论：</h1>
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, resize: 'none' }}
          onChange={onChange}
          placeholder="disable resize"
        />
        <Button type="primary" onClick={handleSubmitComment}>发送评论</Button>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item, index) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                  description={`用户${item.userId}`}
                />
                {item.content}
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}

export default AnswerView;
