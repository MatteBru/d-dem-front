import { FETCH_DISTRICT} from '../actions/types';

const districtReducer = (state = {current: {issues:[]}}, action) => {
  switch (action.type) {
    case FETCH_DISTRICT:
      return {...state ,current: action.district}
    default:
      return state
  }
}

export default districtReducer
