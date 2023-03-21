import { ITopics } from '@page/Home';
import ListItem from './Item';
import styles from './index.module.scss';

function HotTopic({ topic = [] } : { topic : ITopics[]}) {
  return (
    <div className={styles['hotTopic-wrapper']}>
      热议话题
      <ul>
        {
          topic
          && topic.length > 0
          && topic?.map((item) => {
            return (
              <li key={item.QuestionId}>
                <ListItem id={item.QuestionId} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default HotTopic;
