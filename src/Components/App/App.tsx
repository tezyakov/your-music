import React from 'react';

import { Header } from '../../Components/Header/Header';
import { Layout } from '../../Components/Layout/Layout';
import { TrackList } from '../TrackList/TrackList';

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <TrackList />
    </Layout>
  );
}

export default App;
