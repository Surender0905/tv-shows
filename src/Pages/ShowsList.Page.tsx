import { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { showsQueryChange } from '../slices/shows';
import { searchShow, searchShow2 } from '../api';
import LoadingSpinner from '../Components/LoadingSpinner';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Show } from '../models/Show';
import {
  showsLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from '../selectors/Shows';
import { State } from '../store';

type showDetailPageProps = {} & ReduxProps;

const ShowListPage: FC<showDetailPageProps> = ({
  query,
  shows,
  showsQueryChange,
  loading,
}) => {
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      {loading && <LoadingSpinner />}
      <div className="flex flex-wrap justify-center">
        {shows?.length > 0 &&
          shows?.map((show) => <ShowCard key={show.id} show={show} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading: showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  showsQueryChange: showsQueryChange,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
