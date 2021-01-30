import { api } from "../config";
import axios from "axios";

const authUrl = {
  me: `${api}/me`,
};

export default {
  currentUser() {
    return axios
      .get(authUrl.me, {
        headers: {
          cookie: document.cookie,
        },
      })
      .then(({ data }) => data);
  },
};
