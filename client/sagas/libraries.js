/* eslint-disable no-constant-condition */

import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { fetchLibrariesSucceeded } from '../actions/libraries';
import * as request from '../request';

import { ANALYSIS_SUCCEEDED } from '../../shared/constants';

export function* fetchLibrariesSaga() {
  yield* fetchLibraries();
  yield takeEvery(ANALYSIS_SUCCEEDED, fetchLibraries);
}

function* fetchLibraries() {
  const libraries = yield call(request.get, '/api/libraries');
  yield put(fetchLibrariesSucceeded(libraries));
}
