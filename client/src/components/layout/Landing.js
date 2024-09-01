import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Charity Plus</h1>
            <p className='lead'>
              Contribute to events, post your activities, spread kindness and
              love <i className='fas fa-heart'></i>
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-danger'>
                Login
              </Link>
            </div>

            <footer>
              <div className='footer'>
                <a href='https://github.com/artiyadav28' target='__blank'>
                  <i className='fab fa-github'></i>
                </a>{" "}
                <a href='https://github.com/milan0027/charityplus' target='__blank'>
                  {" "}
                  2728{" "}
                </a>{" "}
                <a href='https://github.com/milan0027' target='__blank'>
                  <i className='fab fa-github'></i>
                </a>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
