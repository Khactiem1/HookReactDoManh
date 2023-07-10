import { all } from "redux-saga/effects";
import { AuthSaga } from "./Saga/Auth.Sagasaga";

export function* rootSaga() {
  yield all([AuthSaga()]);
}
