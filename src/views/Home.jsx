import { useEffect, useState } from 'react';
import Thumbnail from '../components/Thumbnail';
import { getPodcastList } from '../services/PodcastList';

const Home = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getList = async () => {
      const podcastList = await getPodcastList();
      setList(podcastList);
      setFilteredList(podcastList);
    };

    getList();
  }, []);

  const handleSearch = (e) => {
    const filter = e.target.value;

    setFilteredList(
      list.filter((podcast) => {
        if (podcast.name.toLowerCase().includes(filter)) return podcast;
        if (podcast.author.toLowerCase().includes(filter)) return podcast;
      })
    );

    setSearch(filter);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="container flex justify-end items-center my-6">
        <div
          className={`${
            !!list.length ? 'bg-blue-900' : 'bg-red-900'
          } p-2 rounded-md text-white mr-6`}
        >
          {list.length}
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter podcasts..."
            className="border-2 rounded-md p-2 outline-none"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="container flex flex-wrap justify-center gap-5">
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
