import { GET_ADMIN_STATS, ADMIN_ERROR } from '../actions/types';

const initialState = {
  stats: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN_STATS:
      return {
        ...state,
        stats: payload,
        loading: false
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}