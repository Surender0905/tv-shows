import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { showQueryChangeAction, showsLoadedAction } from '../actions/shows';
import { searchShow } from '../api';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Show } from '../models/Show';
import { showsQuerySelector, showsSelector } from '../selectors/Shows';
import { State } from '../store';

type showDetailPageProps = {
  shows: Show[];
  query: string;

  showsQueryChange: (query: string) => void;
};

const ShowListPage: FC<showDetailPageProps> = ({
  query,
  shows,
  showsQueryChange,
}) => {
  console.log(shows);
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.length > 0 && shows.map((show) => <ShowCard show={show} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return { query: showsQuerySelector(state), shows: showsSelector(state) };
};

const mapDispatchToProps = {
  showsQueryChange: showQueryChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
