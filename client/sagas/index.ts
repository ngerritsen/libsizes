import { fetchLibrariesSaga } from "./libraries";
import { analyzeSaga, readAnalysesSaga } from "./analysis";
import { all, Effect } from "@redux-saga/core/effects";

export default function* rootSaga(): Generator<Effect> {
  yield all([fetchLibrariesSaga(), analyzeSaga(), readAnalysesSaga()]);
}
