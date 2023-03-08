import fetch from 'cross-fetch';

import {
  checkIfExpired,
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/LocalStorage';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { parseDescriptionFromFeed } from '../utils/ParseRssFeed';

dayjs.extend(duration);

const JSONP_URL = 'https://cors-anywhere.herokuapp.com/';

const URL = JSONP_URL + 'https://itunes.apple.com/lookup?id=';

const parseEpisodeList = (list) => {
  const parsedList = list.results.map((episode) => ({
    id: episode.trackId,
    title: episode.trackName,
    description: episode.description,
    episodeUrl: episode.episodeUrl,
    date: dayjs(episode.releaseDate).format('DD/MM/YYYY'),
    contentType: episode.episodeContentType,
    fileExtension: episode.episodeFileExtension,
    duration: dayjs.duration(episode.trackTimeMillis).asMinutes().toFixed(2),
  }));

  return parsedList;
};

const fetchPodcastDetails = async (podcastId) => {
  const detailsResponse = await fetch(`${URL}${podcastId}`);
  const detailsJSON = await detailsResponse.json();
  const detailsData = detailsJSON.results[0];

  const episodeListResponse = await fetch(
    `${URL}${detailsData.collectionId}&entity=podcastEpisode`
  );
  const episodeListData = await episodeListResponse.json();

  episodeListData.results.shift();

  const parsedEpisodeList = parseEpisodeList(episodeListData);

  const podcastDescription = await parseDescriptionFromFeed(
    detailsData?.feedUrl
  );

  const episodeDetails = {
    id: detailsData.collectionId,
    title: detailsData.collectionName,
    author: detailsData.artistName,
    image: detailsData.artworkUrl600,
    description: podcastDescription ?? '',
    episodesCount: detailsData.trackCount,
    episodeList: parsedEpisodeList,
  };

  return episodeDetails;
};

export const getPodcastDetails = async (podcastId) => {
  try {
    const STORAGE_KEY = `podcast-${podcastId}`;
    const storedDataIsExpired = checkIfExpired(STORAGE_KEY);

    if (storedDataIsExpired) {
      const details = await fetchPodcastDetails(podcastId);

      saveToLocalStorage(STORAGE_KEY, details);

      return details;
    }

    const details = getFromLocalStorage(STORAGE_KEY);

    return details;
  } catch (error) {
    console.error(error);
  }
};
