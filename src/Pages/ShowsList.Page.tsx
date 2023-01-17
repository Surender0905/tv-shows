import { useEffect, useState } from 'react';
import { searchShow } from '../api';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Show } from '../models/Show';

function ShowListPage() {
  const [shows, setShows] = useState<Show[]>([]);

  const [query, setQuery] = useState('');

  useEffect(() => {
    searchShow(query).then((shows) => setShows(shows));
  }, [query]);

  console.log(shows);
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.length > 0 && shows.map((show) => <ShowCard show={show} />)}
      </div>
    </div>
  );
}

export default ShowListPage;
