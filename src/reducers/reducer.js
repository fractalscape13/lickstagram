import * as c from '../Actions/ActionTypes';

let initialState = {
  loggedIn = false,
  currentUser = null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case c.LOG_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        currentUser: action.id
      });
    case c.LOG_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null
      });
  }
}