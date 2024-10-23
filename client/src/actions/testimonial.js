import axios from 'axios';
import { GET_TESTIMONIALS, ADD_TESTIMONIAL, TESTIMONIAL_ERROR, APPROVE_TESTIMONIAL } from './types';

// Get testimonials
export const getTestimonials = () => async dispatch => {
  try {
    const res = await axios.get('/api/testimonials');

    dispatch({
      type: GET_TESTIMONIALS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TESTIMONIAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add testimonial
export const addTestimonial = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/testimonials', formData, config);

    dispatch({
      type: ADD_TESTIMONIAL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TESTIMONIAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Approve testimonial
export const approveTestimonial = id => async dispatch => {
  try {
    const res = await axios.put(`/api/testimonials/${id}`, { approved: true });

    dispatch({
      type: APPROVE_TESTIMONIAL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TESTIMONIAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};