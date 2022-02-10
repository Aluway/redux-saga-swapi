import { LOCATION_CHANGE } from "connected-react-router";
import {
  getRouteConfig,
  MAIN_ROUTE,
  PEOPLE_DETAILS_ROUTE,
} from "../../../routes";
import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_FAILURE,
  LOAD_USER_DETAILS_SUCCESS,
} from "../../reducers/peopleDetails/actions";
import { matchPath } from "react-router";
import {
  apply,
  call,
  select,
  put,
  take,
  takeEvery,
  fork,
} from "redux-saga/effects";
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";

export function* loadPeopleListWorker({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    `https://swapi.dev/api/people?page=${page}&search=${search}`
  );
  const data = yield apply(request, request.json);

  yield put({
    type: LOAD_USERS_SUCCESS,
    payload: data,
  });
}

export function* loadPeopleDetailsWorker({ payload }) {
  const { id } = payload;
  try {
    const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
    const data = yield call([request, request.json]);

    yield put({
      type: LOAD_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_DETAILS_FAILURE,
      payload: error,
    });
  }
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);
    const mainPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(MAIN_ROUTE)
    );
    const detailsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(PEOPLE_DETAILS_ROUTE)
    );

    if (mainPage) {
      const state = yield select((s) => s.people);
      const { page, search } = state;

      yield put({
        type: LOAD_USERS,
        payload: { page, search },
      });
    }

    if (detailsPage) {
      const { id } = detailsPage.params;

      if (id) {
        yield put({
          type: LOAD_USER_DETAILS,
          payload: {
            id,
          },
        });
      }
    }
  }
}

export default function* loadPeople() {
  yield fork(routeChangeSaga);
  yield takeEvery(LOAD_USERS, loadPeopleListWorker);
  yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetailsWorker);
}
