import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE,CLEAR_PROFILES, REQUEST_PROFILE ,GET_PROFILES} from "../actions/types"

const initialState = {
    profile: null,
    profiles: null,
    loading: true,
    error: null,
    request_profile: false   
}

function profile(state=initialState, action) {
    const { type, payload} = action

    switch(type) {

        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                request_profile: false,
                error: null
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false,
                error: null
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
               ...state,
               profile: null,
               loading: false 
            }
        case CLEAR_PROFILES:
            return {
               ...state,
               profiles: null,
               loading: false 
            }
        case REQUEST_PROFILE:
            return {
                    ...state,
                    request_profile: true
                    
                }
        default: 
        return state

    }
}

export default profile