import { Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import styles from './index.module.scss';

function User(props: any) {
  const { route } = props;
  return (
    <div className={styles['user-wrapper']}>
      <Space>
        <NavLink to="/user/answer" activeClassName={styles.active}>回答</NavLink>
        <NavLink to="/user/question" activeClassName={styles.active}>问题</NavLink>
        <NavLink to="/user/article" activeClassName={styles.active}>文章</NavLink>
      </Space>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default User;
