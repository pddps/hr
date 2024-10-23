import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTestimonial } from '../../actions/testimonial';
import PropTypes from 'prop-types';

const TestimonialForm = ({ addTestimonial }) => {
  const [formData, setFormData] = useState({
    text: '',
    rating: 5
  });

  const { text, rating } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addTestimonial(formData);
    setFormData({ text: '', rating: 5 });
  };

  return (
    <div className="testimonial-form">
      <h2 className="text-primary">Leave a Testimonial</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Your experience with Venoda Service"
            value={text}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <select name="rating" value={rating} onChange={onChange}>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Submit Testimonial" />
      </form>
    </div>
  );
};

TestimonialForm.propTypes = {
  addTestimonial: PropTypes.func.isRequired
};

export default connect(null, { addTestimonial })(TestimonialForm);