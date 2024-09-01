import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  deleteComment,
  addCommentLike,
  removeCommentLike,
  approveComment,
} from "../../actions/post";

const CommentItem = ({
  organisationId,
  postId,
  event,
  comment: { _id, text, name, avatar, user, date, likes, unlikes, approval, user_typeof, image },
  auth,
  deleteComment,
  addCommentLike,
  removeCommentLike,
  approveComment,
}) => {
  //auth.user._id==organisationId
  // console.log(organisationId);
  // console.log(auth.user._id);
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-image-name'>
        <Link to={`/profile/users/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <span className='post-name'>{name}</span>
        </Link>
       {(!event || user_typeof) &&  <span className="post-heading-info hide-sm">Comment</span>}
        {event && !user_typeof && (approval?  <span className="post-heading-approved hide-sm">Approved</span>:
        <span className="post-heading-pending hide-sm">Pending Approval</span>)}
        
       
      </div>
      <hr></hr>
      <div className='post-content'>
        <p className='my-1'>{text}</p>
        <div >
        { image.length > 0 && <img alt="post" src={image[0].url} className="post-image" ></img>}
        </div>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          onClick={(e) => addCommentLike(postId, _id)}
          type='button'
          className={
            !auth.loading &&
            likes.filter((like) => like.user.toString() === auth.user._id)
              .length > 0
              ? "btn btn-primary"
              : "btn btn-light"
          }
        >
          <i className='fas fa-thumbs-up'></i>{" "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={(e) => removeCommentLike(postId, _id)}
          type='button'
          className={
            !auth.loading &&
            unlikes.filter((unlike) => unlike.user.toString() === auth.user._id)
              .length > 0
              ? "btn btn-danger"
              : "btn btn-light"
          }
        >
          <i className='fas fa-thumbs-down'></i>{" "}
          {unlikes.length > 0 && <span>{unlikes.length}</span>}
        </button>
        {!auth.loading &&
          auth.user._id.toString() === organisationId &&
          !approval && (
            <>
              <button
                type='button'
                onClick={(e) => approveComment(postId, _id)}
                className='btn btn-primary'
              >
                Approve
              </button>
              <button
                type='button'
                onClick={(e) => deleteComment(postId, _id)}
                className='btn btn-danger'
              >
                Deny
              </button>
            </>
          )}

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  organisationId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  approveComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteComment,
  addCommentLike,
  removeCommentLike,
  approveComment,
})(CommentItem);
