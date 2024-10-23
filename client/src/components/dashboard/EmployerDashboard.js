import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getEmployerJobs } from '../../actions/job';
import JobItem from '../jobs/JobItem';

const EmployerDashboard = ({ getEmployerJobs, job: { jobs, loading } }) => {
  useEffect(() => {
    getEmployerJobs();
  }, [getEmployerJobs]);

  return (
    <div className="employer-dashboard">
      <h2 className="my-2">Your Job Postings</h2>
      <Link to="/jobs/new" className="btn btn-primary">
        <i className="fas fa-plus"></i> Post New Job
      </Link>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobItem key={job._id} job={job} showActions={true} />
        ))
      ) : (
        <p>You haven't posted any jobs yet.</p>
      )}
    </div>
  );
};

EmployerDashboard.propTypes = {
  getEmployerJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getEmployerJobs })(EmployerDashboard);