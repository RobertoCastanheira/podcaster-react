import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingContext } from '../context/Loading';
import { getPodcastDetails } from '../services/PodcastDetails';

const EpisodeDetails = () => {
  const [details, setDetails] = useState({});
  const { podcastId, episodeId } = useParams();
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);

      const podcastDetails = await getPodcastDetails(podcastId);
      const episodeDetails = podcastDetails?.episodeList.filter(
        (episode) => episode.id.toString() === episodeId
      );

      setDetails(episodeDetails[0]);
      setIsLoading(false);
    };

    getDetails();
  }, []);

  return (
    <div className="flex-1 shadow-sm shadow-gray-500 p-4">
      <h1 id="episode-title" className="font-bold text-lg">
        {details?.title}
      </h1>
      <p
        id="episode-description"
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
