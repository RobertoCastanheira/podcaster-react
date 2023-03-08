import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingContext } from '../context/Loading';
import { getPodcastDetails } from '../services/PodcastDetails';

const PodcastDetails = () => {
  const [details, setDetails] = useState({});
  const { podcastId } = useParams();
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);

      const podcastDetails = await getPodcastDetails(podcastId);

      setDetails(podcastDetails);
      setIsLoading(false);
    };

    getDetails();
  }, []);

  if (!details?.id) return <></>;

  return (
    <div className="flex-1">
      <div className="shadow-sm shadow-gray-500 py-3 flex items-center px-4">
        <p className="font-bold">Episodes: {details?.episodesCount}</p>
      </div>
      <div className="mt-4 p-4 shadow-sm shadow-gray-500">
        <table>
          <thead className="border-b-2">
            <tr>
              <td className="font-bold">Title</td>
              <td className="font-bold">Date</td>
              <td className="font-bold">Duration</td>
            </tr>
          </thead>
          <tbody>
            {details?.episodeList
              ? details?.episodeList.map((episode) => (
                  <tr className="border-t-2" key={episode.id}>
                    <td className="text-sm text-blue-600 py-2 pr-2">
                      <Link to={`/podcast/${podcastId}/episode/${episode.id}`}>
                        <span>{episode.title}</span>
                      </Link>
                    </td>
                    <td className="text-sm text-center text-gray-600">
                      {episode.date}
                    </td>
                    <td className="text-sm text-center text-gray-600">
                      {episode?.duration}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PodcastDetails;
