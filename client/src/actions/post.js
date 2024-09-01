import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_POST,
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    UPDATE_UNLIKES,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_LIKES,
    UPDATE_COMMENT_UNLIKES,
    APPROVE_COMMENT,
    CLEAR_POST,
    POSTING,
    COMMENTING
} from './types';

// get posts 
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get organizations posts 
export const getOrganizationPosts = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/organization/${id}`)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add like 
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.likes }
        })
        dispatch({
            type: UPDATE_UNLIKES,
            payload: { id, unlikes: res.data.unlikes }
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// remove like 
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.likes }
        })
        dispatch({
            type: UPDATE_UNLIKES,
            payload: { id, unlikes: res.data.unlikes }
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post Removed', 'success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add post
export const addPost = formData => async dispatch => {
    //console.log(formData)
  
    dispatch({type:POSTING})
    const { text, value, image} = formData
    const array = [];
    if(image !== "")
    {
        try {
            const form = new FormData();
            form.append('file',image);
            form.append('upload_preset','anlkbjq8')
            let instance = axios.create();
            delete instance.defaults.headers.common['x-auth-token'];
        
            
            const response = await instance.post('https://api.cloudinary.com/v1_1/webbid/image/upload', form)
            array.push(response.data.url.replace('upload/','upload/w_800,h_600,c_pad,b_white/'))
            
        } catch (err) {
            console.log(err)
            dispatch( setAlert("Error in Image Uploading", 'danger'))
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })

            return;
        }
    }
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  
    const request = {
        text,
        value,
        image: array
    }
    
    try {
        const res = await axios.post(`/api/posts`, request, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert(value==='event'?'Event Created':'Post Created', 'success'))
        
    } catch (err) {
        const errors = err.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')))
        }
        else {
            dispatch( setAlert('Server Error', 'danger'))
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get post 
export const getPost = id => async dispatch => {
    dispatch({type: CLEAR_POST})
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// add comment
export const addComment = (postId, formData) => async dispatch => {

    dispatch({type:COMMENTING})
    const { text, image} = formData
    const array = [];
    if(image !== "")
    {
        try {
            const form = new FormData();
            form.append('file',image);
            form.append('upload_preset','anlkbjq8')
            let instance = axios.create();
            delete instance.defaults.headers.common['x-auth-token'];
        
            
            const response = await instance.post('https://api.cloudinary.com/v1_1/webbid/image/upload', form)
            array.push(response.data.url.replace('upload/','upload/w_800,h_600,c_pad,b_white/'))
            
        } catch (err) {
            console.log(err)
            dispatch( setAlert("Error in Image Uploading", 'danger'))
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })

            return;
        }
    }
   
  
    const request = {
        text,
        image: array
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, request, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data.comments
        })

        dispatch(setAlert('Content Added', 'success'))
        
    } catch (err) {
      
        dispatch( setAlert('Server Error', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Removed', 'success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// add Comment like 
export const addCommentLike = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/like/${postId}/${commentId}`)

        dispatch({
            type: UPDATE_COMMENT_LIKES,
            payload: { id: commentId, likes: res.data.likes }
        })
        dispatch({
            type: UPDATE_COMMENT_UNLIKES,
            payload: { id: commentId, unlikes: res.data.unlikes }
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// remove Comment like 
export const removeCommentLike = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/unlike/${postId}/${commentId}`) //again sollllyyyy

        dispatch({
            type: UPDATE_COMMENT_LIKES,
            payload: { id: commentId, likes: res.data.likes }
        })
        dispatch({
            type: UPDATE_COMMENT_UNLIKES,
            payload: { id: commentId, unlikes: res.data.unlikes }
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// approve comment
export const approveComment = (postId, commentId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.put(`/api/posts/comment/approve/${postId}/${commentId}`, config)

        dispatch({
            type: APPROVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Approved', 'success'))
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}