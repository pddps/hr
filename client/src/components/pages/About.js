import React from 'react';

const About = () => {
  return (
    <section className="about">
      <h1 className="large text-primary">About Venoda Service</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Connecting Talent with Opportunities
      </p>
      <p>
        Venoda Service Pvt Ltd is a leading hiring and recruitment company, specializing in
        connecting talented individuals with great job opportunities across various industries.
        We focus on agriculture, manufacturing, IT, and more, providing tailored solutions for
        both job seekers and employers.
      </p>
      <p>
        Our mission is to bridge the gap between rural talent and urban opportunities, fostering
        economic growth and empowering communities.
      </p>
      <div className="bg-light p-2 my-1">
        <h3>Our Services</h3>
        <ul>
          <li>Job Placement</li>
          <li>Skill Assessment</li>
          <li>Resume Building</li>
          <li>Interview Preparation</li>
          <li>Career Counseling</li>
        </ul>
      </div>
      <p className="text-center">
        Version <strong>1.0.0</strong>
      </p>
    </section>
  );
};

export default About;