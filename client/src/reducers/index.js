import { combineReducers } from 'redux';
import alert from '../actions/alert';
import auth from '../actions/auth';
import profile from '../actions/profile';
import application from '../actions/application';
import notification from '../actions/notifications';

// Removed unused imports of actions

// Job reducer
const jobReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return { ...state, job: action.payload };
    case 'DELETE_JOB':
      return { ...state, job: null };
    case 'GET_EMPLOYER_JOBS':
      return { ...state, employerJobs: action.payload };
    case 'GET_JOB':
      return { ...state, selectedJob: action.payload };
    case 'GET_JOBS':
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
};

// Testimonial reducer
const testimonialReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TESTIMONIAL':
      return [...state, action.payload];
    case 'APPROVE_TESTIMONIAL':
      return state.map((testimonial) => {
        if (testimonial.id === action.payload.id) {
          return { ...testimonial, approved: true };
        }
        return testimonial;
      });
    case 'GET_TESTIMONIALS':
      return action.payload;
    default:
      return state;
  }
};

// Admin reducer
const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ADMIN_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};

// Combine the reducers
export default combineReducers({
  alert,
  auth,
  profile,
  job: jobReducer,
  application,
  testimonial: testimonialReducer,
  notification,
  admin: adminReducer,
});
