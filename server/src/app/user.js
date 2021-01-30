const { auth } = require("firebase-admin");

const user = {
  async all() {
    const users = await auth().listUsers();
    return users;
  },

  async create({ email, password, displayName, photoURL }) {
    const user = await auth().createUser({
      email,
      password,
      displayName,
      photoURL,
    });
  },

  async update(uid, { email, displayName, photoURL }) {
    return auth().updateUser(uid, { displayName, photoURL, email });
  },

  async delete(uid) {
    return auth().deleteUser(uid);
  },

  async find({ uid, email, phoneNumber }) {
    if (uid) {
      return auth().getUser(input);
    }
    if (email) {
      return auth().getUserByEmail(input.email);
    }
    return auth().getUserByPhoneNumber(phoneNumber);
  },
};

module.exports = user;
