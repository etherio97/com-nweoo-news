const { database } = require("firebase-admin");
const crc32 = require("crc32");

const employee = {
  async all() {
    const snapshot = await database()
      .ref("employees")
      .get();
    return snapshot.val() || {};
  },

  async create({ id, name }) {
    const ref = database()
      .ref("employees")
      .child(crc32(id));
    const snapshot = await ref.get();
    if (snapshot.exists()) {
      throw new Error("already-existed");
    }
    return await ref.set({ id, name });
  },

  async delete(id) {
    const ref = database()
      .ref("employees")
      .child(crc32(id));
    const snapshot = await ref.get();
    if (!snapshot.exists()) {
      throw new Error("unexisted-key");
    }
    return await ref.remove();
  },
};

module.exports = employee;
