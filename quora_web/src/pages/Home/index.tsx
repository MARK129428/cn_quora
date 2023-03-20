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

export interface ITopics {
  QuestionId: number,
  Count: number
}
function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [topic, setTopic] = useState<ITopics[]>([]);
  const init = useCallback(async () => {
    const { data: initArticles } : { data: IArticle[] } = await getArticles();
    setArticles(initArticles);
    const { data: inintTopics } : { data: ITopics[] } = await getHotTopic();
    setTopic(inintTopics);
  }, []);
  useEffect(() => {
    init();
  }, []);
  const history = useHistory();
  const handleArticleClick = useCallback((id: number) => {
    history.push(`/articleview/${id}`);
  }, []);
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
      <HotTopic topic={topic} />
    </div>
  );
}

export default Home;
