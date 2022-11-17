import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import Spinner from '../components/Spinner';
import { setPeoples } from '../store/actions/swActions';

const Home = (props) => {
  const { setPeoples, peoples, films, species } = props;
  const filmOptions = films.map(film => {
    return {
      name: film.title,
      value: film.url,
    };
  });
  const speciesOptions = species.map(data => {
    return {
      name: data.name,
      value: data.url,
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      await setPeoples();
    }
    if (peoples.length === 0) {
      fetchData();
    }
  }, [peoples, setPeoples]);

  if (peoples.length === 0
    || films.length === 0
    || species.length === 0
  ) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <div className="flex justify-center gap-4 mt-4 mb-8">
        <div className="flex items-center gap-4">
          <label className="">Movie</label>
          <SelectSearch
            options={filmOptions}
            name="films"
            placeholder="All"
            search={true}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="">Species</label>
          <SelectSearch
            options={speciesOptions}
            name="species"
            placeholder="All"
            search={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {peoples.map(people => (
          <Link
            key={`people-${people.id}`}
            to={`/character/${people.id}`}
            className="border rounded-[.5rem] text-center py-2"
          >
            {people.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    peoples: state.peoples,
    films: state.films,
    species: state.species,
  };
}
const mapDispatchToProps = {
  setPeoples,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
