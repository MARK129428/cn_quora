import { ReactNode } from 'react';
import styles from './index.module.scss';

export interface HeaderProps {
  children: ReactNode[]
}
function Header({ children } : HeaderProps) {
  return (
    <div className={styles['header-wrapper']}>
      <div>{children[0]}</div>
      <div className={styles['header-middle']}>{children[1]}</div>
      <div>{children[2]}</div>
    </div>
  );
}

export default Header;
