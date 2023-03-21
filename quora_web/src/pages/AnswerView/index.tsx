import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
  Pagination,
  PaginationProps,
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
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data: answerData }: { data: IAnswer } = await getAnswerById(answerId);
    setAnswer(answerData);
    const { data: comments, total }: { data: IComment[] } = await getCommentsByAnswerId(answerId, {
      page: current - 1,
      limit: 10,
    });
    console.log(total);
    setTotal(total);
    setListData(comments);
  }, [current]);
  useEffect(() => {
    init();
  }, [current]);

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
  const onPageChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
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
        <Button type="primary" onClick={handleSubmitComment} disabled={!localStorage.getItem('token')}>发送评论</Button>
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
      <div>
        <Pagination current={current} onChange={onPageChange} total={totalNum} />
      </div>
    </div>
  );
}

export default AnswerView;
