import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showsLoadedAction } from '../actions/shows';
import { searchShow } from '../api';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Show } from '../models/Show';

type showDetailPageProps = {
  showsLoaded: (shows: Show[]) => void;
};

const ShowListPage: FC<showDetailPageProps> = ({ showsLoaded }) => {
  const [shows, setShows] = useState<Show[]>([]);

  const [query, setQuery] = useState('');

  useEffect(() => {
    searchShow(query).then((shows) => showsLoaded(shows));
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
};

const mapDispatchToProps = {
  showsLoaded: showsLoadedAction,
};

export default connect(undefined, mapDispatchToProps)(ShowListPage);
