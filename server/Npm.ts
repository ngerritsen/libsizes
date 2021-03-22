import { Library } from "../shared/types";
import ChildProcess from "child_process";

export default class Npm {
  public getInfo(libraryString: string): Promise<Library> {
    return new Promise((resolve, reject) => {
      ChildProcess.exec(
        `npm view ${libraryString} --json`,
        (error: ChildProcess.ExecException | null, stdout: string) => {
          if (error) {
            reject(this._createLibraryResolveError(libraryString));
            return;
          }

          try {
            resolve(this._processLibraryInfo(stdout));
          } catch (parseError) {
            reject(this._createLibraryResolveError(libraryString));
          }
        }
      );
    });
  }

  public install(library: Library, dir: string): Promise<void> {
    const { name, version } = library;
    return new Promise((resolve, reject) => {
      ChildProcess.exec(
        `npm init -y; npm install ${name}@${version}`,
        { cwd: dir },
        (error: ChildProcess.ExecException | null) => {
          if (error) {
            reject(`Install error: ${error}`);
          }

          resolve();
        }
      );
    });
  }

  private _processLibraryInfo(rawInfo: string): Library {
    const library = this._parseRawLibraryInfo(rawInfo);

    if (!library.name || !library.version) {
      throw Error("Empty JSON");
    }

    return library;
  }

  private _parseRawLibraryInfo(rawInfo: string): Library {
    const libraryInfo = JSON.parse(rawInfo);

    if (Array.isArray(libraryInfo)) {
      return libraryInfo[libraryInfo.length - 1];
    }

    return libraryInfo;
  }

  private _createLibraryResolveError(libraryString: string): Error {
    return new Error(`Could not resolve "${libraryString}"`);
  }
}
