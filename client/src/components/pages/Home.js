import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ isAuthenticated }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Venoda Service</h1>
          <p className="lead">
            Find your dream job or hire the best talent in agriculture, manufacturing, IT, and more
          </p>
          <div className="buttons">
            {!isAuthenticated ? (
              <React.Fragment>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </React.Fragment>
            ) : (
              <Link to="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);