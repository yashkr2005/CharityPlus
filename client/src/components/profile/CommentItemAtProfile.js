import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";


const CommentItemAtProfile = ({
  comment: { text, name, avatar, user,post, date,approval, post_event, image},
}) => {
  //auth.user._id==organisationId
  // console.log(organisationId);
  // console.log(auth.user._id);
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-image-name'>
          <Link to={`/profile/users/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <span className="post-name">{name}</span>
          </Link>
          
          <span className="post-heading-info hide-sm">{post_event ?"Contribution":"Comment"}</span>
       
          {post_event && (approval?  <span className="post-heading-approved hide-sm">Approved</span>:
        <span className="post-heading-pending hide-sm">Pending Approval</span>)} 
        
      </div>
      <hr></hr>
      <div className="post-content">
        <p className='my-1'>{text}</p>
        <div >
        { image.length > 0 && <img alt="post" src={image[0].url} className="post-image" ></img>}
        </div>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <Link to={`/posts/${post}`} className='btn btn-primary'>
            View Post
          </Link>
      </div>
       
       
      </div>
  );
};

CommentItemAtProfile.propTypes = {
 
  comment: PropTypes.object.isRequired,
  
};


export default CommentItemAtProfile;
