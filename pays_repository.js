class PaysRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    createTable() {
      const sql = `
            CREATE TABLE IF NOT EXISTS pays (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              region INTEGER NOT NULL, 
              name TEXT NOT NULL, 
              code TEXT NOT NULL, 
              appointment INTEGER NOT NULL, 
              recipients INTEGER NOT NULL, 
              average INTEGER NOT NULL, 
              sum INTEGER NOT NULL,
              date TEXT NOT NULL
              )
            `;
      return this.dao.run(sql);
    }
    delete(id) {
      return this.dao.run(`DELETE FROM pays WHERE id = ?`, [id]);
    }
    getByRegion(id) {
      return this.dao.all(`SELECT * FROM pays WHERE region = ?`, [id]);
    }
  }
  
  module.exports = PaysRepository;