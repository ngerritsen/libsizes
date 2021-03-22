/* eslint-disable no-constant-condition */

import { put, call, takeEvery, Effect } from "redux-saga/effects";
import { analysisSucceeded } from "../../shared/actions";

import { fetchLibrariesSucceeded } from "../actions";
import * as request from "../request";

export function* fetchLibrariesSaga(): Generator<Effect> {
  yield call(fetchLibraries);
  yield takeEvery(String(analysisSucceeded), fetchLibraries);
}

function* fetchLibraries() {
  const libraries = yield call(request.get, "/api/libraries");
  yield put(fetchLibrariesSucceeded(libraries));
}
