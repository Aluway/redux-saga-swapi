import { all, spawn } from "redux-saga/effects";
import loadPeople from "./peopleSaga/loadPeopleSaga";

export default function* rootSaga() {
  const sagas = [loadPeople];
  yield all(sagas.map((saga) => spawn(saga)));
}
