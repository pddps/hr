import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAdminStats } from '../../actions/admin';
import { approveTestimonial, getTestimonials } from '../../actions/testimonial';
import Spinner from '../layout/Spinner';
const AdminDashboard = ({ getAdminStats, approveTestimonial, getTestimonials, admin: { stats, loading }, testimonial: { testimonials } }) => {
  useEffect(() => {
    getAdminStats();
    getTestimonials();
  }, [getAdminStats, getTestimonials]);

  const [pendingTestimonials, setPendingTestimonials] = useState([]);

  useEffect(() => {
    if (testimonials) {
      setPendingTestimonials(testimonials.filter(t => !t.approved));
    }
  }, [testimonials]);

  const handleApprove = (id) => {
    approveTestimonial(id);
    setPendingTestimonials(pendingTestimonials.filter(t => t._id !== id));
  };

  if (loading || !stats) return <Spinner />;

  return (
    <section className="container">
      <h1 className="large text-primary">Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-item">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-item">
          <h3>Total Jobs</h3>
          <p>{stats.totalJobs}</p>
        </div>
        <div className="stat-item">
          <h3>Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
      </div>
      <div className="pending-testimonials">
        <h2>Pending Testimonials</h2>
        {pendingTestimonials.map(testimonial => (
          <div key={testimonial._id} className="testimonial-item">
            <p>{testimonial.text}</p>
            <p>Rating: {testimonial.rating}/5</p>
            <button onClick={() => handleApprove(testimonial._id)} className="btn btn-success">
              Approve
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

AdminDashboard.propTypes = {
  getAdminStats: PropTypes.func.isRequired,
  approveTestimonial: PropTypes.func.isRequired,
  getTestimonials: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  testimonial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  testimonial: state.testimonial
});

export default connect(mapStateToProps, { getAdminStats, approveTestimonial, getTestimonials })(AdminDashboard);