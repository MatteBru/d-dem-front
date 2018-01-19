import {FETCH_USER, CREATE_USER_ATTEMPT, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, LOGIN_SUCCESS, LOGOUT, CREATE_STANCE} from '../actions/types';

const userReducer = (state = {currentUser: {issues:[]}, authedUser:{issues:[]} }, action) => {
  switch (action.type) {
    // case LOGIN:
    //   return {...state, authedUser: action.auth}
    case FETCH_USER:
      return {...state, currentUser: action.user}
    case CREATE_USER_ATTEMPT:
      return {...state, authedUser: false}
    case LOGIN_SUCCESS:
    case CREATE_USER_SUCCESS:
      return {...state, authedUser: action.user.user}
    case LOGOUT:
    case CREATE_USER_FAILURE:
      return {...state, authedUser:{issues:[]}}
    case CREATE_STANCE:
      return {...state, authedUser: action.user}
    default:
      return state
  }
}

export default userReducer
