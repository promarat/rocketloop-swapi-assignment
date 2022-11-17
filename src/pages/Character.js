import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getPeople, getStarships } from '../api/API';
import { intToRoman } from '../utils/swUtils';

const Character = (props) => {
  const { peoples, films, species } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [infoPeople, setInfoPeople] = useState();
  const [infoSpecies, setInfoSpecies] = useState('');
  const [infoMovie, setInfoMovie] = useState('');
  const [infoStarship, setInfoStarship] = useState('');

  useEffect(() => {
    if (isNaN(id)) {
      navigate('/404');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!isNaN(id) && peoples.length > 0) {
      setInfoPeople(peoples.find(item => item.id === id));
    }
  }, [id, peoples]);

  useEffect(() => {
    if (!isNaN(id) && peoples.length === 0) {
      getPeople(id).then(res => {
        if (!res) {
          navigate('/404');
        } else {
          setInfoPeople(res)
        }
      });
    }
  }, [id, peoples, navigate]);

  useEffect(() => {
    if (infoPeople && films.length > 0) {
      const data = films.filter(item => infoPeople.films.includes(item.url));
      const episodeIds = data.map(item => 'Episode ' + intToRoman(item.episode_id));
      setInfoMovie(episodeIds.join(', '));
    }
  }, [infoPeople, films]);

  useEffect(() => {
    if (infoPeople && infoPeople.species?.length > 0 && species.length > 0) {
      const data = species.filter(item => infoPeople.species.includes(item.url));
      const speciesNames = data.map(item => item.name);
      setInfoSpecies(speciesNames.join(', '));
    }
  }, [infoPeople, species]);

  useEffect(() => {
    if (infoPeople && infoPeople.starships?.length > 0) {
      getStarships(infoPeople.starships).then(res => {
        setInfoStarship(res.join(', '));
      });
    }
  }, [infoPeople]);

  if (!infoPeople) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <Link to="/">
        &lt; Back
      </Link>
      <span className="ml-12">Character Details</span>
      <div className="mt-8">
        <div className="flex items-center gap-4">
          <label className="text-slate-500">Name:</label>
          {infoPeople.name}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label className="text-slate-500">Species:</label>
          {infoSpecies ? infoSpecies : 'Unknown'}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label className="text-slate-500">Movies:</label>
          {infoMovie}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label className="text-slate-500">Starships:</label>
          {infoPeople.starships.length > 0 ? infoStarship : 'Unknown'}
        </div>
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
export default connect(mapStateToProps)(Character);
