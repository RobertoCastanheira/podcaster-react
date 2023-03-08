import fetch from 'cross-fetch';
import {
  checkIfExpired,
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/LocalStorage';

const STORAGE_KEY = 'podcast-list';

const LIST_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const parseList = (list) => {
  const parsedList = list.map((podcast) => ({
    id: podcast.id.attributes['im:id'],
    name: podcast['im:name'].label,
    author: podcast['im:artist'].label,
    image: podcast['im:image'][2].label,
    url: podcast.link.attributes.href,
    description: podcast.summary,
  }));

  return parsedList;
};

const fetchPodcastList = async () => {
  const listResponse = await fetch(LIST_URL);
  const listJSON = await listResponse.json();
  const listData = listJSON.feed.entry;

  const parsedList = parseList(listData);

  saveToLocalStorage(STORAGE_KEY, parsedList);

  return parsedList;
};

export const getPodcastList = async () => {
  try {
    const storedDataIsExpired = checkIfExpired(STORAGE_KEY);

    if (storedDataIsExpired) {
      const list = await fetchPodcastList();

      return list;
    }

    const list = getFromLocalStorage(STORAGE_KEY);

    return list;
  } catch (error) {
    console.error(error);
  }
};
