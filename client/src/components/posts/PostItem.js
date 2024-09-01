import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, unlikes, comments, date, event, image },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-image-name'>
          <Link to={`/profile/organization/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <span className="post-name">{name}</span>
          </Link>

          {event?  <span className="post-heading-approved">Event</span>:
        <span className="post-heading-pending">Post</span>}
      </div>
      <hr></hr>
      <div className="post-content">
        <p className='my'>{text}</p>
        <div >
        { image.length > 0 && <img alt="post" src={image[0].url} className="post-image" ></img>}
        </div>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
       

        {showActions && (
          <>
            <button
              onClick={(e) => addLike(_id)}
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
              onClick={(e) => removeLike(_id)}
              type='button'
              className={
                !auth.loading &&
                unlikes.filter(
                  (unlike) => unlike.user.toString() === auth.user._id
                ).length > 0
                  ? "btn btn-danger"
                  : "btn btn-light"
              }
            >
              <i className='fas fa-thumbs-down'></i>{" "}
              {unlikes.length > 0 && <span>{unlikes.length}</span>}
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussions{" "}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
