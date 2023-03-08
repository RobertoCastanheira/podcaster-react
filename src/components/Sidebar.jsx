import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getPodcastDetails } from '../services/PodcastDetails';

const Sidebar = () => {
  const [details, setDetails] = useState({});
  const { podcastId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const podcastDetails = await getPodcastDetails(podcastId);

      setDetails(podcastDetails);
    };

    getDetails();
  }, []);

  return (
    <aside className="w-[25vw] shadow-sm rounded-sm shadow-gray-500 flex flex-col items-center p-5">
      <Link to={`/podcast/${podcastId}/`}>
        <img
          src={details?.image}
          alt={details?.name}
          className="w-[12vw] rounded-md mb-6"
        />
      </Link>
      <div className="border-y-2  border-gray-200 py-4">
        <Link to={`/podcast/${podcastId}/`}>
          <p className="font-bold">{details?.title}</p>
        </Link>
        <p className="text-md text-gray-600 italic">
          by <Link to={`/podcast/${podcastId}/`}>{details?.author}</Link>
        </p>
      </div>
      <div className="pt-4">
        <p className="font-bold text-md mb-2">Description:</p>
        <p
          className="text-sm text-gray-600 italic"
          dangerouslySetInnerHTML={{ __html: details?.description }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
