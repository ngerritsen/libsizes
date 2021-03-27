import io from "socket.io-client";
import shortId from "shortid";
import { eventChannel } from "redux-saga";
import { put, take, call, takeEvery, Effect } from "redux-saga/effects";

import * as request from "../request";

import * as actions from "../actions";
import * as serverActions from "../../shared/actions";
import { ANALYSIS_UPDATED } from "../../shared/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { host } from "../api";

export function* analyzeSaga(): Iterable<Effect> {
  yield takeEvery(String(actions.analyze), analyze);
}

export function* readAnalysesSaga(): Iterable<Effect> {
  const socket = yield call(connect);
  const channel = yield call(createAnalysesReadChannel, socket);

  while (true) {
    const action = yield take(channel);

    if (action !== undefined) {
      yield put(action as PayloadAction);
    }
  }
}

function* analyze({ payload: libraryString }: PayloadAction<string>) {
  const analysisId = shortId.generate();

  yield put(serverActions.analysisRequested({ id: analysisId, libraryString }));

  const result = yield call(
    request.post,
    `${host}/api/analyses/${analysisId}`,
    {
      libraryString,
    }
  );

  if (result.success) {
    yield put(determineAction(analysisId, result));
    return;
  }

  yield put(
    serverActions.analysisFailed({
      id: analysisId,
      error: result.error.message,
    })
  );
}

function determineAction(analysisId, { exists, existing, version }) {
  return exists
    ? serverActions.analysisSkipped({
        id: analysisId,
        result: existing,
        version,
      })
    : serverActions.analysisStarted({ id: analysisId, version });
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
  const socket = io(host + "/");
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}
