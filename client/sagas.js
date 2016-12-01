/* eslint-disable no-constant-condition */

import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { analysisStarted, analysisSucceeded, analysisFailed, fetchLibrariesSucceeded } from './actions';
import { ANALYZE, ANALYSIS_POLL_INTERVAL } from './constants';
import { ANALYSIS_STATUS_SUCCEEDED, ANALYSIS_STATUS_FAILED } from '../shared/constants';

export default function *rootSaga() {
  yield [
    fetchLibrariesSaga(),
    analyzeSaga(),
    pollAnalysesSaga()
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
  const { analysisId, success } = yield fetch(`/api/analyses/${action.libraryString}`, {
    method: 'POST'
  });

  if (success) {
    yield put(analysisStarted(analysisId));
  }
}

function *pollAnalysesSaga() { // eslint-disable-line max-statements
  while (true) {
    yield promiseDelay(ANALYSIS_POLL_INTERVAL);
    const analyses = yield select(state => state.analyses);

    if (analyses.length > 0) {
      const analysesString = analyses.map(analysis => analysis.id).join(',');
      const serverAnalyses = yield fetch(`/api/analyses/${analysesString}`);
      const actions = determineAnalysisActions(serverAnalyses, analyses);

      for (let i = 0; i < actions.length; i += 1) {
        yield put(actions[i]);
      }
    }
  }
}

function promiseDelay(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}

function determineAnalysisActions(serverAnalyses, analyses) {
  analyses
    .map(analysis => ({
      ...analysis,
      server: serverAnalyses.find(({ id }) => id === analysis.id)
    }))
    .filter(({ status, server }) => server && status !== server.status)
    .map(({ id, server }) => {
      if (server.status === ANALYSIS_STATUS_SUCCEEDED) {
        return analysisSucceeded(id);
      }

      if (server.status === ANALYSIS_STATUS_FAILED) {
        return analysisFailed(id);
      }

      return null;
    })
    .filter(action => !!action);
}
