import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const JobItem = ({
  job: { _id, title, company, location, salary, date }
}) => (
  <div className="job bg-light">
    <div>
      <h2>{title}</h2>
      <p>
        <strong>Company: </strong> {company}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Salary: </strong> {salary}
      </p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
    </div>
    <div>
      <Link to={`/jobs/${_id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  </div>
);

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobItem;