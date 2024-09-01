import { OTHER_GET_PROFILE, OTHER_PROFILE_ERROR, OTHER_CLEAR_PROFILE} from "../actions/types"

const initialState = {
    profile: null,
    loading: true,
    error: null,
}

function otherprofile(state=initialState, action) {
    const { type, payload} = action

    switch(type) {

        case OTHER_GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                request_profile: false,
                error: null
            }
        case OTHER_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case OTHER_CLEAR_PROFILE:
            return {
               ...state,
               profile: null,
               loading: false 
            }
        default: 
        return state

    }
}

export default otherprofile