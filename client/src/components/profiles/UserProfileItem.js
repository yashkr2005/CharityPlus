import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, rating },
    handle,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <div>
        <img src={avatar} alt='' className='round-img' />
      </div>

      <div>
        <h2>{name}</h2>
        <h4>@{handle}</h4>
        <h4>
        <i className="fas fa-star"></i> {rating}
        </h4>
      </div>
      <div>
        <Link to={`/profile/user/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
