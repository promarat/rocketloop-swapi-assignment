import * as ACTION from '../actionTypes';

export const PeopleReducers = (state = [], action) => {
  switch (action.type) {
    case ACTION.SET_PEOPLES:
      return action.payload;
    default:
      return state;
  }
}

export const FilmReducers = (state = [], action) => {
  switch (action.type) {
    case ACTION.SET_FILMS:
      return action.payload;
    default:
      return state;
  }
}

export const SpeciesReducers = (state = [], action) => {
  switch (action.type) {
    case ACTION.SET_SPECIES:
      return action.payload;
    default:
      return state;
  }
}
