/* eslint-disable no-constant-condition */

import io from 'socket.io-client';
import shortId from 'shortid';
import { takeEvery, eventChannel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';

import { fetchLibrariesSucceeded } from './actions';
import { ANALYZE } from './constants';
import * as request from './request';

import { analysisRequested, analysisStarted, analysisFailed, analysisSkipped } from '../shared/actions';
import { ANALYSIS_UPDATED, ANALYSIS_SUCCEEDED } from '../shared/constants';

export default function *rootSaga() {
  yield [
    fetchLibrariesSaga(),
    analyzeSaga(),
    readAnalysesSaga()
  ];
}

function *fetchLibrariesSaga() {
  yield* fetchLibraries();
  yield takeEvery(ANALYSIS_SUCCEEDED, fetchLibraries);
}

function *fetchLibraries() {
  const libraries = yield call(request.get, '/api/libraries');
  yield put(fetchLibrariesSucceeded(libraries));
}

function *analyzeSaga() {
  yield takeEvery(ANALYZE, analyze);
}

function *analyze({ libraryString }) {
  const analysisId = shortId.generate();

  yield put(analysisRequested(analysisId, libraryString));

  const result = yield call(request.post, `/api/analyses/${analysisId}`, { libraryString });

  if (result.success) {
    yield put(determineAction(analysisId, result));
    return;
  }

  yield put(analysisFailed(analysisId, result.error));
}

function *readAnalysesSaga() {
  const socket = yield call(connect);
  const channel = yield call(createAnalysesReadChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function determineAction(analysisId, { exists, existing, version }) {
  return exists ? analysisSkipped(analysisId, existing, version) : analysisStarted(analysisId, version);
}

function createAnalysesReadChannel(socket) {
  return eventChannel(emitter => {
    socket.on(ANALYSIS_UPDATED, action => {
      emitter(action);
    });

    return () => ({});
  });
}

function connect() {
  const socket = io('/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
