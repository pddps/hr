import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import JobList from './components/jobs/JobList';
import JobForm from './components/jobs/JobForm';
import JobDetails from './components/jobs/JobDetails';
import ApplicationForm from './components/applications/ApplicationForm';
import TestimonialForm from './components/testimonials/TestimonialForm';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser  } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser ());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes> {/* Changed from Switch to Routes */}
            <Route path="/" element={<Home />} /> {/* Changed from component to element */}
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<JobList />} />
            <PrivateRoute path="/jobs/new" element={<JobForm />} /> {/* Updated PrivateRoute */}
            <Route path="/jobs/:id" element={<JobDetails />} />
            <PrivateRoute path="/apply/:jobId" element={<ApplicationForm />} />
            <PrivateRoute path="/testimonial" element={<TestimonialForm />} />
            <PrivateRoute path="/dashboard" element={<Dashboard />} />
            <PrivateRoute path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;