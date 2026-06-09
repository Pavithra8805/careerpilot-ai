const { createJsonDb } = require('./json_db_helper');

const { readDb, writeDb, ensureDb } = createJsonDb('users.json');
ensureDb({ users: [] });

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

module.exports = { getUsers, getUserByEmail, addUser, updateUser };
