const fs = require('fs');
const path = require('path');

function createJsonDb(filename) {
  const DB_PATH = path.join(__dirname, filename);

  function ensureDb(initialData) {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  }

  function readDb() {
    // ensureDb(); // Should be called explicitly by the user of this module
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  }

  function writeDb(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  }

  return {
    ensureDb,
    readDb,
    writeDb,
    dbPath: DB_PATH,
  };
}

module.exports = { createJsonDb };
