import { FETCH_ISSUES, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CREATE_USER_ATTEMPT, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, FETCH_ISSUE, FETCH_USER, FETCH_DISTRICT} from './types';
import Fetcher from '../fetcher'

export function fetchIssues() {
  // console.log('here');
  return (dispatch) => {
    Fetcher.fetchIssues().then(issues => dispatch({ type: FETCH_ISSUES, payload: issues }))
  }
}

export function fetchUser(id) {
  return (dispatch) => {
    Fetcher.fetchUser(id).then(user => dispatch({ type: FETCH_USER, user: user }))
  }
}

export function fetchDistrict(id) {
  return (dispatch) => {
    Fetcher.fetchDistrict(id).then(district => dispatch({ type: FETCH_DISTRICT, district: district }))
  }
}



export function loginUser(username, password, history) {
  // console.log('here');
  return (dispatch) => {
    dispatch({ type: LOGIN_ATTEMPT, auth: false })
    Fetcher.login(username, password).then(auth => {
      if (auth['errors']){
        dispatch({ type: LOGIN_FAILURE, auth: auth })
      }else if (auth['jwt']) {
        localStorage.setItem('token', auth['jwt'])
        // history.push('/users/'+ auth.user.id)
        dispatch({ type: LOGIN_SUCCESS, user: auth })
      }
    })
  }
}

export function createUser(username, password, name, email, address) {
  // console.log('here');
  return (dispatch) => {
    dispatch({ type: CREATE_USER_ATTEMPT, user: false })
    Fetcher.fetchDistrictInfo(address).then(info => {
      // debugger
      if (info[0]) {
        let district = {state: info[0].components.state_abbreviation, cdid: info[0].metadata.congressional_district}
        Fetcher.createUser(username, password, name, email, address, district).then(user => {
          if (user['errors']){
            dispatch({ type: CREATE_USER_FAILURE, auth: user })
          }else if (user['jwt']) {
            localStorage.setItem('token', user['jwt'])
            dispatch({ type: CREATE_USER_SUCCESS, user: user })
          }
        })
      }else {
        dispatch({ type: CREATE_USER_FAILURE, auth: {errors:{address: ['Invalid Address']}} })
      }
    })

  }
}

export function getCurrentUser() {
  return (dispatch) => {
    if (localStorage.getItem('token')){
      dispatch({ type: LOGIN_ATTEMPT, auth: false })
      Fetcher.getCurrentUser().then(auth => {
        dispatch({type: LOGIN_SUCCESS, user: auth})
      })
    }
  }
}

export function fetchIssue(id) {
  return (dispatch) => {
      Fetcher.fetchIssue(id).then(issue => {
        dispatch({type: FETCH_ISSUE, issue: issue})
      })
    }
  }

export function createStance(stance){
  return (dispatch) => {
      Fetcher.createStance(stance).then(res => {
        console.log(res);
        // dispatch({type: 'CREATE_STANCE', stance: stance})
        // dispatch({type: , stance: stance})

        dispatch({type: 'CREATE_STANCE', user: res.user, issue: res.issue})
      })
    }
}


// export function fetchSuggestions() {
//   return (dispatch) => {
//     Fetcher.fetchSuggestions().then(list => dispatch({ type: FETCH_ISSUES, payload: user }))
//   }
// }

export function logoutUser(history) {
  localStorage.removeItem('token')
  history.push('/')
  return { type: LOGOUT, auth: false }
}
