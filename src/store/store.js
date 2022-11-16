import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { PeopleReducers, FilmReducers, SpeciesReducers } from './reducers/swReducers';

const initialState = {};
const rootReducer = combineReducers({
  peoples: PeopleReducers,
  films: FilmReducers,
  species: SpeciesReducers,
});

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);
