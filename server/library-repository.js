class LibraryRepository {
  constructor(client) {
    this._client = client;
  }

  save(library, version, sizes, libraryString, analysisId) {
    return this._client.query(`
      INSERT INTO libraries (name, version, normal, minified, gzipped, request, timestamp, analysis)
      VALUES ($1, $2, $3::int, $4::int, $5::int, $6, $7, $8);
    `, [
      library,
      version,
      sizes.normal,
      sizes.minified,
      sizes.gzipped,
      libraryString,
      new Date(),
      analysisId
    ]).catch(error => {
      if (error.message.indexOf('duplicate') > -1) {
        throw new Error(`Failed to save "${library}" with version "${version}", because it already exists.`);
      }

      throw new Error(`Failed to save "${library}" with version "${version}".`);
    });
  }

  get(library, version) {
    return this._client.query(`
      SELECT * FROM libraries
      WHERE name=$1
      AND version=$2;
    `, [
      library,
      version
    ])
      .then(result => result.rows[0]);
  }

  getAll() {
    return this._client.query('SELECT * FROM libraries;')
      .then(result => result.rows);
  }
}

module.exports = LibraryRepository;
