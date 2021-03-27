/* eslint-disable no-constant-condition */

import { put, call, takeEvery, Effect } from "redux-saga/effects";
import { analysisSucceeded } from "../../shared/actions";

import { fetchLibrariesSucceeded } from "../actions";
import {host} from "../api";
import * as request from "../request";

export function* fetchLibrariesSaga(): Generator<Effect> {
  yield call(fetchLibraries);
  yield takeEvery(String(analysisSucceeded), fetchLibraries);
}

function* fetchLibraries() {
  const libraries = yield call(request.get, host + "/api/libraries");
  yield put(fetchLibrariesSucceeded(libraries));
}
