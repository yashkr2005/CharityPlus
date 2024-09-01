import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'
import { getCurrentProfile } from '../../actions/profile';
import PostItem from './PostItem';
import Alert from "../layout/alert";
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading, posting }, getCurrentProfile, profile: {profile, loading: profileLoading}}) => {
    useEffect(()=> {
        getPosts()
        getCurrentProfile()
    },[getPosts, getCurrentProfile, profileLoading])
  return (
      <>
    <section className='container'>
        <Alert/>
      {loading ? (<Spinner/>) : ( 
          <>
      <h1 className='large text-primary'>Posts & Events</h1>
      <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the Community
      </p>
     {!profileLoading &&profile&& profile.type_of? <PostForm posting={posting}/>:''}
      <div className='posts'>
          {posts.map(post => (
              <PostItem key={post._id} post={post} ></PostItem>
          ))}
      </div>
      </>
  )}
  </section>
  </>)
};

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
