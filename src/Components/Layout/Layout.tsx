import React from 'react';

import styles from './styles.module.scss';

export const Layout: React.FC = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
)