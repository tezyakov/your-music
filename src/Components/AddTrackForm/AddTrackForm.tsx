import React from 'react';
import { Button } from '../Button/Button';
import styles from './styles.module.scss';

interface AddTrackFormProps {
    onSubmit: any;
    onFileChange: any;
};

export const AddTrackForm: React.FC<AddTrackFormProps> = ({
  onSubmit,
  onFileChange,
}) => (
  <div  className={styles.addTrackFormContainer}>
    <form onSubmit={onSubmit}>
      <input type="file" accept="audio/*" onChange={onFileChange} />
      <input
        className={styles.addTrackTextInput}
        type="text"
        name="songName"
        placeholder="Song name"
      />
      <Button text="Sumbit" />
    </form>
  </div>
);
