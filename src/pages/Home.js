import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import Spinner from '../components/Spinner';
import YearRange from '../components/YearRange';
import { setPeoples } from '../store/actions/swActions';
import { intToRoman, yearToInt } from '../utils/swUtils';

const Home = (props) => {
  const { setPeoples, peoples, films, species } = props;
  const [filteredPeoples, setFilteredPeoples] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const filmOptions = [
    { name: 'All', value: '' },
    ...films.map(film => (
      {
        name: `Episode ${intToRoman(film.episode_id)}: ${film.title}`,
        value: film.url,
      }
    ))
  ];
  const speciesOptions = [
    { name: 'All', value: '' },
    ...species.map(data => (
      {
        name: data.name,
        value: data.url,
      }
    ))
  ];

  useEffect(() => {
    const fetchData = async () => {
      await setPeoples();
    }
    if (peoples.length === 0) {
      fetchData();
    }
  }, [peoples, setPeoples]);

  useEffect(() => {
    if (peoples.length > 0) {
      setFilteredPeoples(peoples.filter(people => {
        if (selectedMovie && !people.films.includes(selectedMovie)) {
          return false;
        }
        if (selectedSpecies && !people.species.includes(selectedSpecies)) {
          return false;
        }
        if (selectedRange === null) return false;
        const birthYear = yearToInt(people.birth_year);
        if (birthYear === null && (selectedRange.min !== null || selectedRange.max !== null)) {
          return false;
        }
        if (birthYear !== null &&
          ((selectedRange.min !== null && birthYear < selectedRange.min)
          || (selectedRange.max !== null && birthYear > selectedRange.max))
        ) {
          return false;
        }
        return true;
      }));
    }
  }, [peoples, selectedMovie, selectedSpecies, selectedRange]);

  if (peoples.length === 0
    || films.length === 0
    || species.length === 0
  ) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-8">
        <div className="flex items-center gap-4">
          <label className="w-[7.5rem]">Movie</label>
          <SelectSearch
            options={filmOptions}
            name="films"
            placeholder="All"
            search={true}
            value={selectedMovie}
            onChange={setSelectedMovie}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[7.5rem]">Species</label>
          <SelectSearch
            options={speciesOptions}
            name="species"
            placeholder="All"
            search={true}
            value={selectedSpecies}
            onChange={setSelectedSpecies}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[8rem]">Birth Year</label>
          <YearRange onChange={setSelectedRange} />
        </div>
      </div>
      {filteredPeoples.length === 0 ? (
        <div className="text-center">No Result</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPeoples.map(people => (
            <Link
              key={`people-${people.id}`}
              to={`/character/${people.id}`}
              className="border rounded-[.5rem] text-center py-2"
            >
              {people.name}
            </Link>
          ))}
        </div>
      )}
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
