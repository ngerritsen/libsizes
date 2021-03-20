/* eslint-disable no-constant-condition */

import { put, call, takeEvery } from "redux-saga/effects";

import { fetchLibrariesSucceeded } from "../actions/libraries";
import * as request from "../request";

import { ANALYSIS_SUCCEEDED } from "../../shared/constants";

export function* fetchLibrariesSaga() {
  yield* fetchLibraries();
  yield takeEvery(ANALYSIS_SUCCEEDED, fetchLibraries);
}

function* fetchLibraries() {
  const libraries = yield call(request.get, "/api/libraries");
  yield put(fetchLibrariesSucceeded(libraries));
}
