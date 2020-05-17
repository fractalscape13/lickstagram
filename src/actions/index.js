import * as c from './ActionTypes';

export function logIn() {
  return {
    type: c.LOG_IN,
  }
}

export function logOut() {
  return {
    type: c.LOG_OUT,
  }
}