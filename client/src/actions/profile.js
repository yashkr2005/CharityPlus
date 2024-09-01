import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    REQUEST_PROFILE,
    GET_PROFILES,
   // CLEAR_PROFILE,
    GET_POSTS,
    OTHER_GET_PROFILE, OTHER_PROFILE_ERROR, OTHER_CLEAR_PROFILE, CLEAR_PROFILES,
    GET_LEADERBOARD,LEADERBOARD_ERROR
} from './types'

//get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
       // console.log(res.status)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        })
        
    }
}
//get all user profiles
export const getUserProfiles =() =>async dispatch => {
    dispatch({ type: CLEAR_PROFILES})
    try{
        const res= await axios.get('/api/profile/user');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get user profile by id
export const getUserProfileById = userId=>async dispatch => {
    dispatch({type: OTHER_CLEAR_PROFILE });
    try{
        const res= await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: OTHER_GET_PROFILE,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: OTHER_PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get all organization profiles
export const getOrganizationProfiles =() =>async dispatch => {
    dispatch({ type: CLEAR_PROFILES})
    try{
        const res= await axios.get('/api/profile/organization');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get Organization profile by id
export const getOrganizationProfileById = userId=>async dispatch => {
    dispatch({type: OTHER_CLEAR_PROFILE });
    try{
        const res= await axios.get(`/api/profile/organization/${userId}`);
        const postsData = res.data.posts.map( item => item.post).filter( item => item !== null);
        dispatch({
            type: OTHER_GET_PROFILE,
            payload: res.data
        });
        dispatch({
            type: GET_POSTS,
            payload: postsData
        })
        
    }catch(e){
        dispatch({
            type: OTHER_PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}
// create or update a profile
export const createProfile = (formData,edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'

            }
        }

       

        const res = await axios.post('/api/profile',formData, config)

        dispatch({
            type: REQUEST_PROFILE
        })

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created','success'))
       

       

        
    } catch (err) {
        const errors = err.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')))
        }
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        })
    }
} 

//follow an organization
export const follow = id =>async dispatch => {
    try{
        const res= await axios.post(`/api/profile/follow/${id}`);
        dispatch({
            type: OTHER_GET_PROFILE,
            payload: res.data.profile
        });
        dispatch(setAlert((res.data.state ? 'followed successfully' : 'unfollowed successfully'),'success'));
    }catch(e){
        const errors = e.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: OTHER_PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

// get list of followers of a organziation
export const getFollowers = id =>async dispatch => {
    dispatch({ type: CLEAR_PROFILES})
    try{
        const res= await axios.get(`/api/profile/followers/${id}`);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}
// get list of followering of a user
export const getFollowing = id =>async dispatch => {
    dispatch({ type: CLEAR_PROFILES})
    try{
        const res= await axios.get(`/api/profile/following/${id}`);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

// get users by rank
export const getLeaderboard = ()=> async dispatch => {
    try{
        const res= await axios.get('/api/users/rating');
        // console.log(res.data);
        dispatch({
            type: GET_LEADERBOARD,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: LEADERBOARD_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

export const setNotificationsZero = (id) => async dispatch => {
    try{
        await axios.put('/api/profile/notifications', {id});
    } catch(e){
        console.log(e)

    }
}