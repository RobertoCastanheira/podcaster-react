import { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../context/Loading';
import Thumbnail from '../components/Thumbnail';
import { getPodcastList } from '../services/PodcastList';

const Home = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);

      const podcastList = await getPodcastList();

      setList(podcastList ?? []);
      setFilteredList(podcastList ?? []);
      setIsLoading(false);
    };

    getList();
  }, []);

  const handleSearch = (e) => {
    const filter = e.target.value;

    setFilteredList(
      list.filter((podcast) => {
        if (podcast.name.toLowerCase().includes(filter.toLowerCase()))
          return podcast;
        if (podcast.author.toLowerCase().includes(filter.toLowerCase()))
          return podcast;
      })
    );

    setSearch(filter);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-end items-center my-6 w-full">
        <div
          id="podcast-count"
          className={`${
            !!filteredList.length ? 'bg-blue-900' : 'bg-red-900'
          } p-2 rounded-md text-white mr-6`}
        >
          {filteredList.length}
        </div>
        <div>
          <input
            id="search"
            type="text"
            placeholder="Filter podcasts..."
            className="border-2 rounded-md p-2 outline-none"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div
        id="podcast-container"
        className="flex flex-wrap justify-center gap-5"
      >
        {filteredList.map(({ id, name, image, author }) => (
          <Thumbnail
            id={id}
            name={name}
            image={image}
            author={author}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
