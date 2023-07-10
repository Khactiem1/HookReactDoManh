import { fork } from "redux-saga/effects";
function* handleLogin() {}
function* watchAuth() {}
export function* AuthSaga() {
  yield fork(watchAuth);
}
