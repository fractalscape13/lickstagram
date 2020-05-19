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