import io from "socket.io-client";
import shortId from "shortid";
import { eventChannel } from "redux-saga";
import { put, take, call, takeEvery } from "redux-saga/effects";

import { ANALYZE } from "../constants";
import * as request from "../request";

import {
  analysisRequested,
  analysisStarted,
  analysisFailed,
  analysisSkipped,
} from "../../shared/actions";
import { ANALYSIS_UPDATED } from "../../shared/constants";

export function* analyzeSaga() {
  yield takeEvery(ANALYZE, analyze);
}

export function* readAnalysesSaga() {
  const socket = yield call(connect);
  const channel = yield call(createAnalysesReadChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* analyze({ libraryString }) {
  const analysisId = shortId.generate();

  yield put(analysisRequested(analysisId, libraryString));

  const result = yield call(request.post, `/api/analyses/${analysisId}`, {
    libraryString,
  });

  if (result.success) {
    yield put(determineAction(analysisId, result));
    return;
  }

  yield put(analysisFailed(analysisId, result.error));
}

function determineAction(analysisId, { exists, existing, version }) {
  return exists
    ? analysisSkipped(analysisId, existing, version)
    : analysisStarted(analysisId, version);
}

function createAnalysesReadChannel(socket) {
  return eventChannel((emitter) => {
    socket.on(ANALYSIS_UPDATED, (action) => {
      emitter(action);
    });

    return () => ({});
  });
}

function connect() {
  const socket = io("/");
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}
