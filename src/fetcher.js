// const baseURL = "http://localhost:3000"
const baseURL = "https://dirct-dem0cracy.herokuapp.com"
class Fetcher {

  // static baseURL = () => ("http://localhost:3000")

  // static getWithToken = url => {
  //   const token = localStorage.getItem('token');
  //   return fetch(url, {
  //     headers: { Authorization: token }
  //   }).then(res => res.json());
  // };
  //
  // static getCurrentUser = () => {
  //   return this.getWithToken(baseURL + `/current_user`);
  // };



  static login = (username, password) => {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    }
    return fetch(baseURL + '/auth', options).then(res => res.json())
  }

  static fetchIssues = () => {
    console.log(baseURL + '/issues');
    return fetch(baseURL + '/issues').then(res => res.json())
  }

  static getCurrentUser = () => {
    return fetch(baseURL + '/current_user', {headers: {'Authorization': localStorage.getItem('token')}}).then(res => res.json())
  }

  static fetchUser = (id) => {
    return fetch(baseURL + '/users/' + id).then(res => res.json())
  }

  static fetchDistrict = (id) => {
    return fetch(baseURL + '/districts/' + id).then(res => res.json())
  }

  static createUser = (username, password, name, email, address, district) => {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: {username, password, name, email, address}, district: district})
    }
    return fetch(baseURL + '/users', options).then(res => res.json())
  }

  static createIssue = (issue) => {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({issue: issue})
    }
    return fetch(baseURL + '/issues', options).then(res => res.json())
  }

  static createStance = (stance) => {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({stance: stance})
    }
    return fetch(baseURL + '/stances', options).then(res => res.json())
  }

  static fetchSuggestions = (text) => {
    return fetch('https://us-autocomplete.api.smartystreets.com/suggest?auth-id=efd99d92-72e7-a941-f6e8-ffcc15cd4cf2&auth-token=4AyyNrG0vSIf3j3OtVUo&prefix=' + text).then(res => res.json())
  }

  static fetchDistrictInfo = address => {
    return fetch('https://us-street.api.smartystreets.com/street-address?auth-id=efd99d92-72e7-a941-f6e8-ffcc15cd4cf2&auth-token=4AyyNrG0vSIf3j3OtVUo&street=' + address)
    .then(res => {if(res.status == 400){return []} else{return res.json()}})
  }

  static fetchIssue = (id) => {
    return fetch(baseURL + '/issues/' + id).then(res => res.json())
  }
}

export default Fetcher
