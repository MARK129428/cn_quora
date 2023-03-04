import { Avatar, Space } from 'antd';
import styles from './index.module.scss';
import Agree from '@/assets/img/agree.svg';
import Fuck from '@/assets/img/fuck.svg';

function AskItem() {
  return (
    <div className={styles['askItem-wrapper']}>
      <div>
        <Avatar shape="square" size={48} src="https://cdn.v2ex.com/gravatar/18283d165ae691f87a44ee2077ba3607?s=48&d=retro" />
      </div>
      <div className={styles['askItem-middle']}>
        <div className={styles['middle-question']}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssss蔽姓陈，得一千金，今天 15:16 出娘胎，求踢名</div>
        <div className={styles['middle-ctl']}>
          <Space>
            <div>cfans1993</div>
            <div className={styles['ctl-item']}>
              <div className={styles.agree}>
                <img src={Agree} alt="同意" />
                <span>1000</span>
              </div>
              <div className={styles.fuck}>
                <img src={Fuck} alt="踩死" />
              </div>
            </div>
          </Space>
        </div>
      </div>
      <div className={styles['comment-num']}>1</div>
    </div>
  );
}

export default AskItem;
