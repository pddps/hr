import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/notifications';
import PropTypes from 'prop-types';

const NotificationIcon = ({ notifications, getNotifications }) => {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-icon">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

NotificationIcon.propTypes = {
  notifications: PropTypes.array.isRequired,
  getNotifications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps, { getNotifications })(NotificationIcon);