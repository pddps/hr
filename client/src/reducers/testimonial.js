import {
  GET_TESTIMONIALS,
  ADD_TESTIMONIAL,
  TESTIMONIAL_ERROR,
  APPROVE_TESTIMONIAL
} from '../actions/types';

const initialState = {
  testimonials: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

   (type) {
    case GET_TESTIMONIALS:
      return {
        ...state,
        testimonials: payload,
        loading: false
      };
    case ADD_TESTIMONIAL:
      return {
        ...state,
        testimonials: [payload, ...state.testimonials],
        loading: false
      };
    case APPROVE_TESTIMONIAL:
      return {
        ...state,
        testimonials: state.testimonials.map(testimonial =>
          testimonial._id === payload._id ? { ...testimonial, approved: true } : testimonial
        ),
        loading: false
      };
    case TESTIMONIAL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}