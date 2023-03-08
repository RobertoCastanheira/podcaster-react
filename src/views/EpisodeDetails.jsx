import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPodcastDetails } from '../services/PodcastDetails';

const EpisodeDetails = () => {
  const [details, setDetails] = useState({});
  const { podcastId, episodeId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const podcastDetails = await getPodcastDetails(podcastId);
      const episodeDetails = podcastDetails?.episodeList.filter(
        (episode) => episode.id.toString() === episodeId
      );

      setDetails(episodeDetails[0]);
    };

    getDetails();
  }, []);

  return (
    <div className="flex-1 shadow-sm shadow-gray-500 p-4">
      <h1 className="font-bold text-lg">{details?.title}</h1>
      <p
        className="italic text-gray-600 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: details?.description }}
      />
      <audio className="audio mt-4 w-full" controls>
        <source
          src={details?.episodeUrl}
          type={`${details?.contentType}/${details?.fileExtension}`}
        />
      </audio>
    </div>
  );
};

export default EpisodeDetails;
