import { Link } from 'react-router-dom';

const Thumbnail = ({ id, image, name, author }) => {
  return (
    <div className="w-[200px] shadow-sm shadow-gray-500 p-3 hover:shadow-md hover:shadow-gray-800">
      <Link
        to={`/podcast/${id}`}
        className="flex flex-col items-center justify-center"
      >
        <img src={image} alt={name} className="rounded-full w-20 m-2" />
        <p className="text-md text-center">{name}</p>
        <p className="text-gray-600 text-sm text-center">
          Author: <span>{author}</span>
        </p>
      </Link>
    </div>
  );
};

export default Thumbnail;
