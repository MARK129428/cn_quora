import Header from '@component/Header';
import styles from './index.module.scss';

function Home() {
  return (
    <div>
      <Header>
        <div className={styles.data}>xxx</div>
        <div style={{ width: '50px', height: '50px' }}>xx</div>
        <div>xxx</div>
      </Header>
    </div>
  );
}

export default Home;
