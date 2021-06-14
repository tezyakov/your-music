import React from 'react';
import { SpotifyTrack } from './SpotifyTrack';
import styles from './styles.module.scss';

interface SpotifyTrackListProps {
  tracks: any;
}

export const SpotifyTrackList: React.FC<SpotifyTrackListProps> = ({ tracks }) => (
  <div className={styles.spotifyTrackListContainer}>
    <p className={styles.spotifyTrackListHeader}>List of spotify tracks:</p>
    {tracks.map((track: { artists: string[], name: string }) => (
      <SpotifyTrack artists={track.artists} name={track.name} />
    ))}
  </div>
);