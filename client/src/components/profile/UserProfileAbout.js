import React from "react";
import PropTypes from "prop-types";

const UserProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <>
         
          {name && <h2 className='text-primary'>About {name.trim().split(' ')[0]}</h2>}
          <hr></hr>
          <h4>{bio}</h4>
         
        </>
      )}
    </div>
  );
};

UserProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfileAbout;
