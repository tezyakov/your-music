import React from 'react';
import styles from './styles.module.scss';

interface AddButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Add a track
    </button>
  );
};
