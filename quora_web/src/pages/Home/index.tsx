import {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { IArticle } from '@page/Article';
import AskCard from '@page/Home/components/AskCard';
import AskItem from '@page/Home/components/AskItem';
import HotTopic from '@page/Home/components/HotTopic';
import { getArticles } from '@/api/article';
import { getHotTopic, getQuestion } from '@/api/question';
import { Pagination, PaginationProps } from 'antd';

export interface ITopics {
  QuestionId: number,
  Count: number
}
function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [topic, setTopic] = useState<ITopics[]>([]);
  const [totalNum, setTotal] = useState(10);
  const [current, setCurrent] = useState(1);
  const init = useCallback(async () => {
    const { data: initArticles, total } : { data: IArticle[], total: number } = await getArticles({
      page: current - 1,
      limit: 10,
    });
    setTotal(total);
    setArticles(initArticles);
    const { data: inintTopics } : { data: ITopics[] } = await getHotTopic();
    setTopic(inintTopics);
  }, [current]);
  useEffect(() => {
    init();
  }, [current]);
  const history = useHistory();
  const handleArticleClick = useCallback((id: number) => {
    history.push(`/articleview/${id}`);
  }, []);
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <div>
      <AskCard />
      <div>
        {
          articles?.map((item) => {
            return (
              <Fragment key={item.id!}>
                <AskItem
                  id={item.id!}
                  title={item.title!}
                  index={item.UserId!}
                  handleArticleClick={handleArticleClick!}
                />
              </Fragment>
            );
          })
        }
      </div>
      <div>
        <Pagination current={current} onChange={onChange} total={totalNum} />
      </div>
      <HotTopic topic={topic} />
    </div>
  );
}

export default Home;
