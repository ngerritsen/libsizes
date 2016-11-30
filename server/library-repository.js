class LibraryRepository {
  constructor(client) {
    this._client = client;
  }

  save(library, version, sizes) {
    return this._client.query(`
      INSERT INTO libraries (library, version, normal, minified, minified_gzipped) VALUES (
        '${library}',
        '${version}',
        ${sizes.normal},
        ${sizes.minified},
        ${sizes.minified_gzipped}
      ) ON CONFLICT DO UPDATE;
    `);
  }

  getAll() {
    return this._client.query('SELECT * FROM libraries;')
      .then(result => result.rows);
  }
}

module.exports = LibraryRepository;
