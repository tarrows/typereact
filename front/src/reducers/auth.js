const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};

export default function auth(state=initialState, action) {

  switch (action.type) {
    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null, isAuthenticated: false, isLoading: false};

    default:
      return state;
  }
}

export const register = (username, password) => {

  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("/api/auth/register", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {return {status: res.status, data}});
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
          throw res.data;
        } else {
          dispatch({type: 'REGISTRATION_FAILED', data: res.data});
          throw res.data;
        }
      })
  }
}
