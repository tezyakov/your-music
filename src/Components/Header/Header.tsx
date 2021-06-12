import React from 'react';
import styles from './styles.module.scss';

interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => (
  <div className={styles.headerContainer}>{`Your music, ${name.split(" ")[0]}`}</div>
);