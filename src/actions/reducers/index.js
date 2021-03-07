'use strict';

import redux from '@actions/constants/redux';

const initialState = {
  fetching: false,
  loading: false,
  error: false,
};

const reducers = (state = initialState, action) => {
  if (action.type === redux.RESET_REDUX) {
    return initialState;
  } else if (action.type === redux.API_SERVER_ERROR) {
    return {
      ...state,
      fetching: false,
      loading: false,
      error: true,
    };
  } else if (action.type.includes('FETCH')) {
    delete state[action.type.replace('FETCH', 'RECEIVE')];
    return {
      ...state,
      fetching: true,
      loading: true,
      error: false,
    };
  } else if (action.type.includes('RECEIVE')) {
    return {
      ...state,
      fetching: false,
      loading: false,
      error: false,
      [action.type]: action.payload,
    };
  } else {
    return state;
  }
};

export default reducers;
