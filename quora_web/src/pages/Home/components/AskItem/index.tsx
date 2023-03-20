import { Avatar, Space } from 'antd';
import styles from './index.module.scss';
import Agree from '@/assets/img/agree.svg';
import Fuck from '@/assets/img/fuck.svg';

interface IAsckItemProps {
  id: number | undefined,
  title: string | undefined,
  index: string | undefined,
  handleArticleClick: Function | undefined
}
function AskItem({
  id,
  title,
  index,
  handleArticleClick,
} : IAsckItemProps) {
  return (
    <div className={styles['askItem-wrapper']}>
      <div>
        <Avatar shape="square" size={48} src={`https://joesch.moe/api/v1/random?key=${index}`} />
      </div>
      <div className={styles['askItem-middle']}>
        <div
          role="presentation"
          className={styles['middle-question']}
          onClick={() => { handleArticleClick!(id); }}
        >
          {title}
        </div>
        <div className={styles['middle-ctl']}>
          <Space>
            <div>{`用户${index}`}</div>
            {/* <div className={styles['ctl-item']}>
              <div className={styles.agree}>
                <img src={Agree} alt="同意" />
                <span>1000</span>
              </div>
              <div className={styles.fuck}>
                <img src={Fuck} alt="踩死" />
              </div>
            </div> */}
          </Space>
        </div>
      </div>
      {/* <div className={styles['comment-num']}>1</div> */}
    </div>
  );
}

export default AskItem;
