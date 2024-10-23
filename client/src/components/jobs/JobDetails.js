import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJob } from '../../actions/job';
import Spinner from '../layout/Spinner';

const JobDetails = ({ getJob, job: { job, loading }, match, auth }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  if (loading || job === null) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <Link to="/jobs" className="btn btn-light">
        Back To Jobs
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user.role === 'jobseeker' && (
          <Link to={`/apply/${job._id}`} className="btn btn-primary">
            Apply Now
          </Link>
        )}
      <div className="job-details bg-light p-2 my-1">
        <h2 className="text-primary">{job.title}</h2>
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Job Type:</strong> {job.jobType}
        </p>
        <p>
          <strong>Industry:</strong> {job.industry}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <div className="job-description my-1">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>
        <div className="job-requirements my-1">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

JobDetails.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job,
  auth: state.auth
});

export default connect(mapStateToProps, { getJob })(JobDetails);