/* eslint-disable no-constant-condition */

import { put, call, takeEvery, Effect, delay } from "redux-saga/effects";

import * as actions from "../actions";
import { host } from "../api";
import * as request from "../request";

export function* fetchLibrariesSaga(): Generator<Effect> {
  yield takeEvery(String(actions.fetchLibraries), fetchLibraries);
  yield put(actions.fetchLibraries());
}

function* fetchLibraries() {
  yield delay(2000);
  try {
    const libraries = yield call(request.get, host + "/api/libraries");
    yield put(actions.fetchLibrariesSucceeded(libraries));
  } catch (e) {
    yield put(actions.fetchLibrariesFailed());
  }
}
