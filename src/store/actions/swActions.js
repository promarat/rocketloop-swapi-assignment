import * as ACTION from '../actionTypes';
import * as API from '../../api/API';

export const setPeoples = () => async (dispatch) => {
  const response = await API.getPeoples();
  dispatch({
    type: ACTION.SET_PEOPLES,
    payload: response,
  });
}

export const setFilms = () => async (dispatch) => {
  const response = await API.getFilms();
  dispatch({
    type: ACTION.SET_FILMS,
    payload: response,
  });
}

export const setSpecies = () => async (dispatch) => {
  const response = await API.getSpecies();
  dispatch({
    type: ACTION.SET_SPECIES,
    payload: response,
  });
}
