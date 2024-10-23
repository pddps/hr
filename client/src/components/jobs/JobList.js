import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs } from '../../actions/job';
import JobItem from './JobItem';
import JobSearchFilter from './JobSearchFilter';
import Spinner from '../layout/Spinner';

const JobList = ({ getJobs, job: { jobs, loading } }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const onFilter = (filters) => {
    let filtered = jobs;
    if (filters.title) {
      filtered = filtered.filter(job => job.title.toLowerCase().includes(filters.title.toLowerCase()));
    }
    if (filters.location) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.salary) {
      filtered = filtered.filter(job => parseInt(job.salary) >= parseInt(filters.salary));
    }
    setFilteredJobs(filtered);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Jobs</h1>
      <p className="lead">
        <i className="fas fa-briefcase"></i> Browse and find a job
      </p>
      <JobSearchFilter onFilter={onFilter} />
      <div className="jobs">
        {filteredJobs.map(job => (
          <JobItem key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

JobList.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJobs })(JobList);