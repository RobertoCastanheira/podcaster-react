import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from './views/Home';
import PodcastDetails from './views/PodcastDetails';
import EpisodeDetails from './views/EpisodeDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/podcast/:podcastId',
    element: <PodcastDetails />,
  },
  {
    path: '/podcast/:podcastId/episode/:episodeId',
    element: <EpisodeDetails />,
  },
]);

export default router;
