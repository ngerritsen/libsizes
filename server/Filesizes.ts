import fs from "fs/promises";
import path from "path";
import util from "util";
import gzipSize from "gzip-size";

import { OUTPUT_FILENAME, OUTPUT_FILENAME_MINIFIED } from "./constants";
import { Sizes } from "../shared/types";

type GzipAsync = (str: string) => Promise<number>;
const gzipSizeAsync = util.promisify(gzipSize) as GzipAsync;

export default class Filesizes {
  async measure(dir: string): Promise<Sizes> {
    const bundleBuf = await fs.readFile(path.resolve(dir, OUTPUT_FILENAME));
    const bundleBufMinified = await fs.readFile(
      path.resolve(dir, OUTPUT_FILENAME_MINIFIED)
    );

    return {
      normal: bundleBuf.length,
      minified: bundleBufMinified.length,
      gzipped: await gzipSizeAsync(bundleBufMinified.toString()),
    };
  }
}
