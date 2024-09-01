import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { follow } from '../../actions/profile'
import { connect } from 'react-redux';
const ProfileItem = ({ profile:{ 
    user:{ _id, name, avatar},
    handle,
    type_of
}}) => {
  return <div className='profile-item bg-light'>
    <div>
    <img src={avatar} alt="" className='round-img'/>
    </div>
    
      <div>
          <h2>{name}</h2>
          <h4>@{handle}</h4>
      </div>
      <div>
      <Link to={type_of?`/profile/organization/${_id}`:`/profile/user/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
      </div>
     
        
  </div>
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired
};

export default connect(null, {follow})(ProfileItem);
