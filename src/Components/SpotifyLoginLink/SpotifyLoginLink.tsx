import React from 'react';
import styles from './styles.module.scss';

interface SpotifyLoginLinkProps {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
};

export const SpotifyLoginLink: React.FC<SpotifyLoginLinkProps> = ({
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
}) => (
  <a
  href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20',
  )}&response_type=token&show_dialog=true`}
>
  Login to Spotify
</a>
);
