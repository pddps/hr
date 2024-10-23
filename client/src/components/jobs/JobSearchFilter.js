import React, { useState } from 'react';
import PropTypes from 'prop-types';

const JobSearchFilter = ({ onFilter }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: ''
  });

  const { title, location, salary } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    onFilter(formData);
  };

  return (
    <form className="form job-search-filter" onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Job Title"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Minimum Salary"
          name="salary"
          value={salary}
          onChange={onChange}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Filter" />
    </form>
  );
};

JobSearchFilter.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default JobSearchFilter;