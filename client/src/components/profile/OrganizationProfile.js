import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import OrganizationProfileTop from "./OrganizationProfileTop";
import { getOrganizationProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import OrganizationProfileAbout from "./OrganizationProfileAbout";
import OrganizationProfileBottom from './OrganizationProfileBottom'
import NotFound from "../layout/NotFound";
import Alert from "../layout/alert";
const OrganizationProfile = ({
  getOrganizationProfileById,
  otherprofile: { profile, loading, error },
  auth,
}) => {
  let { id } = useParams();
  useEffect(() => {
    getOrganizationProfileById(id);
  }, [getOrganizationProfileById, id]);

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        {loading || profile === null ? (
          error === null ? (
            <Spinner />
          ) : (
            <NotFound />
          )
        ) : (
          <Fragment>
            <Link to='/OrganizationProfiles' className='btn btn-light'>
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              )}
            {
              <div className='my-1'>
              <OrganizationProfileTop otherprofile={profile}  id={id} />
              <OrganizationProfileAbout profile={profile} />
              <OrganizationProfileBottom  id={id}/>
              </div>
            }
          
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

OrganizationProfile.propTypes = {
  getOrganizationProfileById: PropTypes.func.isRequired,
  otherprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  otherprofile: state.otherprofile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getOrganizationProfileById })(
  OrganizationProfile
);
