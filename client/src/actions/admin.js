import axios from 'axios';
import { GET_ADMIN_STATS, ADMIN_ERROR } from './types';

// Get admin dashboard stats
export const getAdminStats = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/stats');

    dispatch({
      type: GET_ADMIN_STATS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};