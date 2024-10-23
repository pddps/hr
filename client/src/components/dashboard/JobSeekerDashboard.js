import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApplications } from '../../actions/application';
import ApplicationItem from '../applications/ApplicationItem';

const JobSeekerDashboard = ({ getApplications, application: { applications, loading } }) => {
  useEffect(() => {
    getApplications();
  }, [getApplications]);

  return (
    <div className="job-seeker-dashboard">
      <h2 className="my-2">Your Job Applications</h2>
      {applications.length > 0 ? (
        applications.map(app => (
          <ApplicationItem key={app._id} application={app} />
        ))
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}
    </div>
  );
};

JobSeekerDashboard.propTypes = {
  getApplications: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { getApplications })(JobSeekerDashboard);