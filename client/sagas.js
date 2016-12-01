import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { fetchLibrariesSucceeded } from './actions';
import { ANALYZE } from './constants';

export default function *rootSaga() {
  yield [
    fetchLibrariesSaga(),
    analyzeSaga()
  ];
}

function *fetchLibrariesSaga() {
  const result = yield fetch('/api/libraries');
  const libraries = yield result.json();
  yield put(fetchLibrariesSucceeded(libraries));
}

function *analyzeSaga() {
  yield takeEvery(ANALYZE, analyze);
}

function *analyze(action) {
  yield fetch(`/api/analysis/${action.libraryString}`, {
    method: 'POST'
  });
}
