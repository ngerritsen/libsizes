class LibraryRepository {
  constructor(client) {
    this._client = client;
  }

  save(library, version, sizes) {
    return this._client.query(`
      INSERT INTO libraries (name, version, normal, minified, gzipped) VALUES (
        '${library}',
        '${version}',
        ${sizes.normal},
        ${sizes.minified},
        ${sizes.gzipped}
      );
    `);
  }

  get(library, version) {
    return this._client.query(`
      SELECT * FROM libraries
      WHERE name='${library}'
      AND version='${version}';
    `)
      .then(result => result.rows[0]);
  }

  getAll() {
    return this._client.query('SELECT * FROM libraries;')
      .then(result => result.rows);
  }
}

module.exports = LibraryRepository;
