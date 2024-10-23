import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJob } from '../../actions/job';
import PropTypes from 'prop-types';

const JobForm = ({ addJob, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: '',
    industry: ''
  });

  const {
    title,
    company,
    location,
    description,
    requirements,
    salary,
    jobType,
    industry
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addJob(formData, history);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Post a Job</h1>
      <p className="lead">
        <i className="fas fa-briefcase"></i> Create a new job listing
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Job Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Job Description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Requirements (comma-separated)"
            name="requirements"
            value={requirements}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Salary"
            name="salary"
            value={salary}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select name="jobType" value={jobType} onChange={onChange} required>
            <option value="">* Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Industry"
            name="industry"
            value={industry}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Post Job" />
      </form>
    </section>
  );
};

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(JobForm);