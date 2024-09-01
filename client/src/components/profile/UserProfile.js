import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import UserProfileTop from "./UserProfileTop";
import { getUserProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import UserProfileAbout from "./UserProfileAbout";
import NotFound from "../layout/NotFound";
import UserProfileBottom from "./UserProfileBottom";
const UserProfile = ({ getUserProfileById, otherprofile: { profile, loading, error }, auth }) => {
  let { id } = useParams();
  useEffect(() => {
    getUserProfileById(id);
  }, [getUserProfileById, id]);
  return (
    <Fragment>
      <section className='container'>
        {loading || profile===null ? ( error === null? <Spinner/>:<NotFound/>) :  ( 
          <Fragment>
            <Link to='/userprofiles' className='btn btn-light'>
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              )}
            <div className='my-1'>
              <UserProfileTop otherprofile={profile} id={id} />
              <UserProfileAbout profile={profile} />
              <UserProfileBottom profile={profile}/>
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

UserProfile.propTypes = {
  getUserProfileById: PropTypes.func.isRequired,
  otherprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  otherprofile: state.otherprofile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserProfileById })(UserProfile);
