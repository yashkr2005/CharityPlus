import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_UNLIKES,
  GET_POST,
  CLEAR_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT_LIKES,
  UPDATE_COMMENT_UNLIKES,
  APPROVE_COMMENT,
  POSTING,
  COMMENTING
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: null,
  posting: false,
  commenting: false,
};

function post(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        posting: false,
        error: null,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
        error: null,
      };
    case CLEAR_POST:
      return {
        ...state,
        post:null,
        loading: false,
        error: null
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        posting: false,
        commenting: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
        error: null,
      };
    case UPDATE_UNLIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, unlikes: payload.unlikes } : post
        ),
        loading: false,
        error: null,
      };
    case UPDATE_COMMENT_LIKES:
      return {
        ...state,
        post: {
            ...state.post,
            comments: state.post.comments.map((comment) =>
            comment._id === payload.id ? { ...comment, likes: payload.likes } : comment
          ),
          
        },
        loading: false,
        error: null,
      };
    case UPDATE_COMMENT_UNLIKES:
      return {
        ...state,
        post: {
            ...state.post,
            comments: state.post.comments.map((comment) =>
            comment._id === payload.id ? { ...comment, unlikes: payload.unlikes } : comment
          ),
          
        },
        loading: false,
        error: null,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
        commenting: false,
        error: null,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        
        },
        loading: false,
        error: null,
      };
    case APPROVE_COMMENT:
      return {
        ...state,
        post:{
          ...state.post,
          comments: state.post.comments.map((comment)=>
            comment._id === payload ? {...comment, approval: true} : comment)
        },
        loading:false,
        error:null
      }
    case POSTING:
      return {
      ...state,
      posting: true
    }
    case COMMENTING:
      return {
        ...state,
        commenting: true
      }
    default:
      return state;
  }
}

export default post;
