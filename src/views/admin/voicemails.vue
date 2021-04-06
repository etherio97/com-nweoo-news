<template>
  <v-container class="mt-5 mb-15">
    <v-card elevation="0">
      <v-card-title>
        <v-row>
          <h2>Voicemails</h2>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            icon
            outlined
            to="/admin/add-voicemail"
            v-show="loggedIn"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Duration</th>
              <th><span class="d-sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="Object.keys(items).length">
              <tr v-for="(voicemail, id) in items" :key="id">
                <td>{{ new Date(voicemail.timestamp).toLocaleString() }}</td>
                <td>
                  <a
                    :href="voicemail.src"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {{ voicemail.title }}
                  </a>
                </td>
                <td>{{ voicemail.duration.toFixed(2) }}s</td>
                <td>
                  <v-btn
                    v-show="loggedIn"
                    icon
                    color="error"
                    @click="remove(id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-else>
              <td colspan="4">
                <p class="pa-2 grey--text">- အသံသွင်းထားသောဖိုင်များမရှိပါ</p>
              </td>
            </template>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "Voicemail",
  data: () => ({
    items: {},
  }),
  methods: {
    remove(id) {
      let item = this.items[id];
      firebase
        .storage()
        .refFromURL(item.src)
        .delete()
        .then(() =>
          this.axios.delete(`${this.$root.api}/voicemails/${id}`).then(() => {
            this.items[this.id] = undefined;
            delete this.items[this.id];
          })
        );
    },
  },
  beforeMount() {
    this.axios(`${this.$root.api}/voicemails`)
      .then(({ data }) => (this.items = data))
      .catch((e) => (this.error = e.message));
  },
  computed: {
    loggedIn() {
      return Boolean(this.$root.user?.uid);
    },
  },
};
</script>
