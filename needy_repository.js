class NeedyRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
          CREATE TABLE IF NOT EXISTS needies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            region INTEGER NOT NULL,
            cnt INTEGER NOT NULL,
            date TEXT NOT NULL
            )
          `;
    return this.dao.run(sql);
  }
  delete(id) {
    return this.dao.run(`DELETE FROM needies WHERE id = ?`, [id]);
  }
  getByRegion(id) {
    return this.dao.all(`SELECT * FROM needies WHERE region = ?`, [id]);
  }
}

module.exports = NeedyRepository;
