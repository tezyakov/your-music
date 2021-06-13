import React from 'react';
import styles from './styles.module.scss';

interface SpotifyTrackProps {
  artists: string[];
  name: string;
}

export const SpotifyTrack: React.FC<SpotifyTrackProps> = ({ artists, name }) => (
  <p>{`${artists} - ${name}`}</p>
);