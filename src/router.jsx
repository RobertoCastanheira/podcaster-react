import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/Main';
import DetailsLayout from './layouts/Details';

import Home from './views/Home';
import PodcastDetails from './views/PodcastDetails';
import EpisodeDetails from './views/EpisodeDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/podcast/:podcastId',
        element: <DetailsLayout />,
        children: [
          {
            index: true,
            element: <PodcastDetails />,
          },
          {
            path: '/podcast/:podcastId/episode/:episodeId',
            element: <EpisodeDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
