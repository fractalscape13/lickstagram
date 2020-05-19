import * as c from '../actions/ActionTypes';

let initialState = {
  loggedIn: false,
  currentId: null,
  currentUser: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case c.LOG_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        currentId: action.id,
        currentUser: action.currentUser
      });
    case c.LOG_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        currentId: null,
        currentUser: null
      });
    case c.UPDATE_SESSION:
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        currentId: action.currentId,
        currentUser: action.currentUser
      });
    default:
      return state;
  }
};