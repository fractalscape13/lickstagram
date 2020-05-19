import * as c from './ActionTypes';

export function logIn(action) {
  return {
    type: c.LOG_IN,
    id: action.id,
    currentUser: action.username
  }
}

export function logOut() {
  return {
    type: c.LOG_OUT,
  }
}

export function updateSession(action) {
  return {
    type: c.UPDATE_SESSION,
    loggedIn: action.loggedIn,
    currentId: action.currentId,
    currentUser: action.currentUser
  }
}