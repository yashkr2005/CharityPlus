import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getOrganizationPosts } from "../../actions/post";
const OrganizationProfileBottom = ({
  post: { posts, loading },
  getOrganizationPosts,
  id
}) => {
  useEffect(()=>{
    getOrganizationPosts(id)
  },[getOrganizationPosts,id])
  return (
    <div className='profile-about bg-light p-2 my-1'>
        <h2 className='text-primary'>Posts</h2>
        {loading ? (<Spinner/>) : (<>
      {
          posts && posts.map((post)=>{
              return(
                  <PostItem post={post} key={post._id.toString()} />
              )
          })
      }{ posts.length === 0 ? <h4>Nothing to display...</h4>:''}</> )}
    </div>
  );
};

OrganizationProfileBottom.propTypes = {
  post: PropTypes.object.isRequired,
  getOrganizationPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
})
export default connect(mapStateToProps, { getOrganizationPosts })(OrganizationProfileBottom);
