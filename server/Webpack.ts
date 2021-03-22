import { Library } from "../shared/types";

import util from "util";
import path from "path";
import webpack, { MultiStats, Configuration } from "webpack";

type WebpackAsync = (configuration: Configuration) => Promise<MultiStats>;
const webpackAsync = util.promisify(webpack) as WebpackAsync;

import {
  NODE_MODULES_DIR,
  OUTPUT_FILENAME,
  OUTPUT_FILENAME_MINIFIED,
} from "./constants";
import { Environment } from "./types";

export default class Webpack {
  public async build(
    library: Library,
    dir: string,
    mode: Environment
  ): Promise<void> {
    await webpackAsync({
      entry: path.resolve(dir, NODE_MODULES_DIR, library.name),
      output: {
        path: dir,
        filename:
          mode === "production" ? OUTPUT_FILENAME_MINIFIED : OUTPUT_FILENAME,
      },
      mode,
    });
  }
}
