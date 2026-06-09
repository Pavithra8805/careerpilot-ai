const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'users.json');

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getUsers() {
  const db = readDb();
  return db.users || [];
}

function getUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function addUser(user) {
  const db = readDb();
  db.users = db.users || [];
  db.users.push(user);
  writeDb(db);
  return user;
}

function updateUser(id, updates) {
  const db = readDb();
  db.users = db.users || [];
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  db.users[idx] = { ...db.users[idx], ...updates };
  writeDb(db);
  return db.users[idx];
}

module.exports = { getUsers, getUserByEmail, addUser };
