import { put } from 'redux-saga/effects';
import { fetchLibrariesSucceeded } from './actions';

export default function *rootSaga() {
  const result = yield fetch('/api/libraries');
  const libraries = yield result.json();
  yield put(fetchLibrariesSucceeded(libraries));
}
