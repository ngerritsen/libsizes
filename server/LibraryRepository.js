class LibraryRepository {
  constructor(client) {
    this._client = client;
  }

  async getAll() {
    const result = await this._client.query("SELECT * FROM libraries;");

    return result.rows;
  }

  async get(library, version) {
    const result = await this._client.query(
      `
          select * from libraries
          where name=$1
          and version=$2;
        `,
      [library, version]
    );

    return result.rows[0];
  }

  async save(library, version, sizes, libraryString, analysisId) {
    try {
      return this._client.query(
        `
            insert into libraries (name, version, normal, minified, gzipped, request, timestamp, analysis)
            values ($1, $2, $3::int, $4::int, $5::int, $6, $7, $8);
        `,
        [
          library,
          version,
          sizes.normal,
          sizes.minified,
          sizes.gzipped,
          libraryString,
          new Date(),
          analysisId,
        ]
      );
    } catch (error) {
      if (error.message.indexOf("duplicate") > -1) {
        throw new Error(
          `Failed to save "${library}" with version "${version}", because it already exists.`
        );
      }

      throw new Error(`Failed to save "${library}" with version "${version}".`);
    }
  }
}

module.exports = LibraryRepository;
