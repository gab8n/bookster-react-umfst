const LOGIN = 'bookster-react-umfst/auth/login';
const LOGOUT = 'bookster-react-umfst/auth/logout';
const initialState = {
  loggedIn: false,
  userData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        loggedIn: false,
        userData: {},
      };
    default:
      return state;
  }
}

export const setUserData = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
