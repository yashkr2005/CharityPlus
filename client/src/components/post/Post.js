import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getCurrentProfile } from "../../actions/profile";
import NotFound from "../layout/NotFound";
import Alert from "../layout/alert";

const Post = ({ getPost, post: { post, loading, commenting, error }, profile: {profile, loading: profileLoading}, getCurrentProfile }) => {
  let { id } = useParams();
  useEffect(() => {
    getPost(id);
    getCurrentProfile()
  }, [getPost, id, getCurrentProfile, profileLoading]);

  // console.log(profile);
  return (
    <>
      <section className='container'>
      <Alert/>
        {loading || post === null ? ( !error?
          <Spinner />:<NotFound/>
        ) : (
          <>
            <Link to='/posts' className='btn'>
              Back to Posts
            </Link>
            <PostItem post={post} showActions={false} />
             {!profileLoading && profile ?<CommentForm commenting={commenting} postId = {post._id}/>:''}
             <div className='bg-primary p my-1'>
                   <h3>Comments/Contributions</h3>
              </div>
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} event={post.event} comment= {comment} postId={post._id} organisationId={post.user.toString()}/>
                ))}
                {post.comments.length === 0?<h4>Nothing to display...</h4>:''}
            </div>
          </>
        )}
      </section>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getPost, getCurrentProfile })(Post);
