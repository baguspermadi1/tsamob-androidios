'use strict';

import redux from '../constants/redux';

const initialState = {
  fetching: false,
  loading: false,
  error: false,
  status: false,
};

const reducers = (state = initialState, action) => {
  if (action.type === redux.API_SERVER_ERROR) {
    return {
      ...state,
      fetching: false,
      loading: false,
      error: true,
    };
  } else if (action.type.includes('FETCH')) {
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
