import { useCallback, useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import { useHistory } from 'react-router';
import { getUserQuestions } from '@/api/question';
import styles from './index.module.scss';

export interface IQuestion {
  id?: number;
  Content?: string;
  UserId?: number;
  LikeNum?: number;
  DislikeNum?: number;
  IsUserLike?: boolean | null;
}
function Question() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data, total }: { data: IQuestion[]} = await getUserQuestions({
      page: current - 1,
      limit: 10,
    });
    setTotal(total);
    setQuestions(data);
  }, [current]);

  useEffect(() => {
    init();
  }, [current]);

  const history = useHistory();
  const handleItemClick = (id: number) => {
    history.push(`/question/${id}`);
  };
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
      <ul className={styles['question-wrapper']}>
        {
          questions?.map(({ id, Content }) => {
            return (
              <li
                role="presentation"
                key={`${id}`}
                onClick={() => { handleItemClick(id!); }}
              >
                <div className={styles.id}>{id}</div>
                <div className={styles.title}>{Content}</div>
              </li>
            );
          })
        }
      </ul>
      <div>
        <Pagination current={current} onChange={onChange} total={totalNum} />
      </div>
    </>
  );
}

export default Question;
