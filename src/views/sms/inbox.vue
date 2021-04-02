<template>
  <v-container>
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
        <v-simple-table>
          <thead>
            <tr>
              <th>Phone No.</th>
              <th>Message</th>
              <th>Date</th>
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
  }),
  watch: {
    mode(value) {
      if (sessionStorage.getItem("_token")) {
        this.axios(
          `https://nwe-oo-default-rtdb.firebaseio.com/v1/sms-${value}.json?orderBy="$key"&limitToLast=${this.limit}`
        ).then(({ data }) => {
          this.messages = Object.values(data).reverse();
        });
      }
    },
  },
  beforeMount() {
    this.mode = "inbox";
  },
};
</script>
