<template>
  <v-container>
    <v-card elevation="0" class="mx-auto" max-width="500px" :loading="loading">
      <v-card-title>
        Send SMS
      </v-card-title>
      <v-card-text>
        <v-expand-transition>
          <v-alert v-show="error" type="error">
            {{ error }}
          </v-alert>
        </v-expand-transition>
        <v-text-field
          label="ဖုန်းနံပါတ်"
          prepend-inner-icon="mdi-phone"
          hint="eg.09XXXXXXX"
          type="tel"
          outlined
          v-model="phone"
        />
        <v-text-field
          label="Access Token"
          prepend-inner-icon="mdi-key"
          type="password"
          outlined
          v-model="token"
        />
        <v-textarea label="အကြောင်းအရာ" v-model="message" outlined></v-textarea>
        <v-select
          :items="slots"
          v-model="slot"
          label="SIM Slot"
          outlined
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="font-weight-bold pl-4 pr-2"
          @click="send"
          :loading="loading"
          :disabled="loading"
          depressed
        >
          စာတိုပို့
          <v-icon class="ml-2">mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SendSMS",
  data: () => ({
    phone: "",
    message: "",
    dialog: false,
    error: null,
    loading: false,
    token: "",
    slot: "0",
    slots: ["0", "1"],
  }),

  methods: {
    send() {
      this.loading = true;
      this.axios
        .post(`${this.$root.api}/sms/send?token=${this.token}`, {
          phone: this.phone,
          message: this.message,
          sim_slot: this.slot,
        })
        .then(() => this.$router.push("/sms/inbox"))
        .catch((e) => (this.error = e.response?.data?.error || e.message))
        .finally(() => (this.loading = false));
    },
  },

  watch: {
    token(value) {
      sessionStorage.setItem("_token", btoa(value));
    },
  },

  beforeMount() {
    if (this.$route.query["phone"]) {
      this.phone = decodeURIComponent(this.$route.query["phone"]);
    }
    if (this.$route.query["message"]) {
      this.message = decodeURIComponent(this.$route.query["message"]);
    }
    if (this.$route.query["token"]) {
      this.token = decodeURIComponent(this.$route.query["token"]);
    } else {
      let token = sessionStorage.getItem("_token");
      if (token) this.token = atob(token);
    }
  },
};
</script>
