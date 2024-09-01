import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUserProfiles } from '../../actions/profile';
import UserProfileItem from './UserProfileItem';

const UserProfiles = ({ getUserProfiles , profile:{ profiles, loading }}) => {
   useEffect(()=>{
       getUserProfiles();
   } ,[getUserProfiles])

  return (
  <>
  <section className='container'>
   { loading || profiles ===  null ? <Spinner /> : (<>
     <h1 className='large text-primary'>Users</h1>
     <p className='lead'>
         <i className='fab fa-connectdevelop' ></i> Find connect with other users
     </p>
     <div className='profiles'>
         {profiles.length > 0 ? (
             profiles.map(profile => (
                 <UserProfileItem key={profile._id} profile={profile} />
             ))
         ) : <h2>No profiles to diplay ...</h2>}
     </div>
   </>) }
   </section>
  </>
  );
};

UserProfiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getUserProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    profile: state.profile
})
export default connect(mapStateToProps, { getUserProfiles } )(UserProfiles);
