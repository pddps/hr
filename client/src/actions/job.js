import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  DELETE_JOB,
  JOB_ERROR,
  GET_EMPLOYER_JOBS // Ensure this is imported
} from './types';

// Get all jobs
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/jobs');
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a single job by ID
export const getJob = id => async dispatch => {
  try {
    const res = await axios.get(`/api/jobs/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a new job
export const addJob = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/jobs', formData, config);
    dispatch({
      type: ADD_JOB,
      payload: res.data
    });

    dispatch(setAlert('Job Created', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete a job by ID
export const deleteJob = id => async dispatch => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: id
    });

    dispatch(setAlert('Job Removed', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get employer jobs
export const getEmployerJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/employer/jobs'); // Adjust the endpoint as necessary
    dispatch({
      type: GET_EMPLOYER_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};