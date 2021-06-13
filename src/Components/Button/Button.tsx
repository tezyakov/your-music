import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text: string;

};

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
  <button className={styles.button} onClick={onClick}>
    {text}
  </button>
);
