import { fetchLibrariesSaga } from './libraries';
import { analyzeSaga, readAnalysesSaga } from './analysis';

export default function* rootSaga() {
  yield [fetchLibrariesSaga(), analyzeSaga(), readAnalysesSaga()];
}
