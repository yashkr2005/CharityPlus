import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getOrganizationProfiles } from '../../actions/profile';
import OrganizationProfileItem from './OrganizationProfileItem';


const OrganizationProfiles = ({ getOrganizationProfiles , profile:{ profiles, loading }}) => {
   useEffect(()=>{
       getOrganizationProfiles();
   } ,[getOrganizationProfiles])

  return (
  <>
  <section className='container'>
   { loading || profiles === null ? <Spinner /> : (<>
     <h1 className='large text-primary'>Organizations</h1>
     <p className='lead'>
         <i className='fab fa-connectdevelop' ></i> Find and connect with Organizations
     </p>
     <div className='profiles'>
         {profiles.length > 0 ? (
             profiles.map(profile => (
                 <OrganizationProfileItem key={profile._id} profile={profile} />
             ))
         ) : <h2>No profiles to diplay ...</h2>}
     </div>
   </>) }
   </section>
  </>
  );
};

OrganizationProfiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getOrganizationProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    profile: state.profile
})
export default connect(mapStateToProps, { getOrganizationProfiles } )(OrganizationProfiles);
