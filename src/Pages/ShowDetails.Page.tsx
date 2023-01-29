import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CastCard from '../Components/CastCard';
import GenrePill from '../Components/GenrePill';
import withRouter, { WithRouterProps } from '../hocs/withRouter';
import { BiArrowBack } from 'react-icons/bi';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../store';
import { Show } from '../models/Show';
import { showsMapSelector } from '../selectors/Shows';
import { loadShowAction } from '../actions/shows';
import LoadingSpinner from '../Components/LoadingSpinner';

type OwnProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps & OwnProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  loadShow,
}) => {
  useEffect(() => {
    loadShow(+params.showId);
  }, [params.showId]);

  if (!show) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-2">
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
        className="text-cyan-500"
      >
        <BiArrowBack />
        Back
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((genre) => (
          <GenrePill name={genre} key={genre} />
        ))}
      </div>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium}
          alt="image"
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{ __html: show.summary || '' }}></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:
            <span className="text-gray-700">{show.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
              name="Henry Cavill"
            />
          }
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const id = +ownProps.params.showId;

  return {
    show: showsMapSelector(state)[id],
  };
};

const mapDispatchToProps = {
  loadShow: loadShowAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
