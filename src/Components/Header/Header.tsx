import React from 'react';
import styles from './styles.module.scss';

interface HeaderProps {
  name: string;
  children: any;
}

export const Header: React.FC<HeaderProps> = ({ name, children }) => (
  <div className={styles.headerContainer}>
    {`Your music, ${name.split(' ')[0]}`}
    <div>{children}</div>
  </div>
);