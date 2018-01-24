import { FETCH_ISSUES, FETCH_ISSUE, CREATE_STANCE, CREATE_ISSUE } from '../actions/types';

const issueReducer = (state = {hot: [], new: [], top: [], current: {views:[]}}, action) => {
  switch (action.type) {
    case FETCH_ISSUES:
      let p = action.payload
      return {...state ,...{hot: [...p.hot], new: [...p.new], top: [...p.top]}}
    case FETCH_ISSUE:
      return {...state ,current: action.issue}
    case CREATE_STANCE:
      return {...state ,current: action.issue}
    case CREATE_ISSUE:
      return {...state ,current: action.issue}
    default:
      return state
  }
}

export default issueReducer
