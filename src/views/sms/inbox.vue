<template>
  <v-container class="mb-15">
    <v-card class="mx-auto" elevation="0">
      <v-card-title> SMS [{{ mode }}] </v-card-title>
      <v-card-actions>
        <v-btn
          small
          color="blue darken-1"
          v-if="mode === 'inbox'"
          @click="mode = 'outbox'"
          rounded
          dark
        >
          Outbox
        </v-btn>
        <v-btn
          small
          color="blue darken-1"
          v-else
          @click="mode = 'inbox'"
          rounded
          dark
        >
          Inbox
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-expand-transition>
          <v-alert v-show="error" type="error">
            {{ error }}
          </v-alert>
        </v-expand-transition>
        <v-simple-table>
          <thead>
            <tr>
              <th id="phone">Phone No.</th>
              <th>Message</th>
              <th id="datetime">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in messages" :key="index">
              <td>{{ message.phone }}</td>
              <td>{{ message.message }}</td>
              <td>{{ new Date(message.date).toLocaleString() }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    mode: null,
    limit: 10,
    messages: [],
    loading: false,
    error: null,
  }),
  watch: {
    mode(value) {
      this.error = null;
      this.messages = [];
      this.axios(
        `${this.$root.api}/sms/${value}?token=${this.token}&limit=${this.limit}`
      )
        .then(({ data: { data } }) => {
          this.messages = Object.values(data).reverse();
        })
        .catch((e) => (this.error = e.message))
        .finally(() => (this.loading = false));
    },
  },
  beforeMount() {
    let token = sessionStorage.getItem("_token");
    this.mode = "inbox";
    this.token = token ? atob(token) : null;
  },
};
</script>

<style scoped>
th#phone {
  width: 160px;
}

th#datetime {
  width: 180px;
}
</style>
