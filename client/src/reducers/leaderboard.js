import {
    GET_LEADERBOARD,
    LEADERBOARD_ERROR
} from '../actions/types'

const initialState = {
    users: null,
    loading: true,
    error: null,
  };
  
  function leaderboard(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_LEADERBOARD:
            return{
                ...state,
                loading:false,
                users:payload,
                error:null
            }
        case LEADERBOARD_ERROR:
            return {
                ...state,
                loading:false,
                error:payload,
                users:null
            }
      default:
        return state;
    }
  }
  
  export default leaderboard;
  