import React, { useState } from 'react';
import { connect } from 'react-redux';
import { applyForJob } from '../../actions/application';
import PropTypes from 'prop-types';

const ApplicationForm = ({ applyForJob, match, history }) => {
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: ''
  });

  const { resume, coverLetter } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    applyForJob(match.params.jobId, formData, history);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Apply for Job</h1>
      <p className="lead">
        <i className="fas fa-file-alt"></i> Submit your application
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            placeholder="Paste your resume here"
            name="resume"
            value={resume}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Cover Letter (optional)"
            name="coverLetter"
            value={coverLetter}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit Application" />
      </form>
    </section>
  );
};

ApplicationForm.propTypes = {
  applyForJob: PropTypes.func.isRequired
};

export default connect(null, { applyForJob })(ApplicationForm);