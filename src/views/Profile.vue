<template>
  <v-container class="mt-4">
    <h2 class="h2 mb-4">သင့်အကောင့်</h2>

    <v-expand-transition>
      <v-alert type="error" v-show="error">
        {{ error }}
      </v-alert>
    </v-expand-transition>

    <v-row>
      <!-- facebook pages -->
      <v-col cols="12">
        <h4 class="h2">သင့်ဖေ့ဘွတ်စာမျက်နှာများ</h4>
        <v-list>
          <v-list-item v-for="page in facebook_pages" :key="page.id">
            <v-list-item-content>
              <v-list-item-title>
                <v-row class="pa-3">
                  <h4 class="h2">
                    {{ page.name }}
                  </h4>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue lighten-1"
                    text
                    @click="clipboardCopied(page.access_token)"
                  >
                    <v-icon>mdi-clipboard-outline</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ page.category }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- link with Google -->
      <v-col cols="6" sm="12">
        <v-btn
          v-if="linkedWithGoogle"
          class="font-weight-bold"
          color="red darken-2 my-2"
          block
          text
          @click="unlinkWithGoogle()"
        >
          <v-icon class="mr-2">mdi-google</v-icon>
          ချိတ်ဆက်မှုရပ်တန့်ရန်
        </v-btn>
        <v-btn
          v-else
          class="font-weight-bold my-2"
          color="red darken-2"
          dark
          block
          @click="linkWithGoogle"
        >
          <v-icon class="mr-2">mdi-google</v-icon>
          ချိတ်ဆက်ရန်
        </v-btn>
      </v-col>

      <!-- link with Facebook -->
      <v-col cols="6" sm="12">
        <v-btn
          v-show="linkedWithFacebook"
          class="font-weight-bold my-2"
          color="blue darken-2"
          block
          dark
          @click="reauthenticateWithFacebook"
        >
          <v-icon class="mr-2">mdi-facebook</v-icon>
          ပြန်လည်ချိတ်ဆက်ရန်
        </v-btn>
        <v-btn
          v-if="linkedWithFacebook"
          class="font-weight-bold my-2"
          color="blue darken-2"
          block
          text
          @click="unlinkWithFacebook"
        >
          <v-icon class="mr-2">mdi-facebook</v-icon>
          ချိတ်ဆက်မှုရပ်တန့်ရန်
        </v-btn>
        <v-btn
          v-else
          class="font-weight-bold"
          color="blue darken-2"
          dark
          block
          @click="linkWithFacebook"
        >
          <v-icon class="mr-2">mdi-facebook</v-icon>
          ချိတ်ဆက်ရန်
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

const AUTH_PROVIDERS = {
  email: "Email",
  "facebook.com": "Facebook",
  "google.com": "Google",
};

export default {
  name: "Profile",
  data: () => ({
    error: undefined,
    linkedWithGoogle: false,
    linkedWithFacebook: false,
    linkedWithEmailAndPassword: false,
    access_token: undefined,
    facebook_pages: [],
  }),
  methods: {
    clipboardCopied(access_token) {
      if (access_token) {
        let input = window.document.createElement("input");
        input.type = "text";
        input.value = access_token;
        window.document.body.appendChild(input);
        input.select();
        window.document.execCommand("copy");
        input.remove();
        alert("Copied to clipboard!");
      }
    },
    linkWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      this.error = undefined;
      this.currentUser
        .linkWithPopup(provider)
        .then(() => this.fetchProviderData())
        .catch((e) => {
          this.error = e.message;
        });
    },
    unlinkWithGoogle() {
      this.error = undefined;
      this.currentUser
        .unlink("google.com")
        .then(() => this.$router.push("/"))
        .catch((e) => {
          this.error = e.message;
        });
    },
    linkWithFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.error = undefined;
      provider.addScope("public_profile,email,pages_read_engagement");
      this.currentUser
        .linkWithPopup(provider)
        .then((data) => {
          this.access_token = data.credential.accessToken;
          this.fetchProviderData();
          this.fetchFacebookPages();
        })
        .catch((e) => {
          this.error = e.message;
        });
    },
    reauthenticateWithFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.error = undefined;
      provider.addScope("public_profile,email,pages_read_engagement");
      this.currentUser
        .reauthenticateWithPopup(provider)
        .then((data) => {
          this.access_token = data.credential.accessToken;
          this.fetchFacebookPages();
        })
        .catch((e) => {
          this.error = e.message;
        });
    },
    unlinkWithFacebook() {
      this.error = undefined;
      this.currentUser
        .unlink("facebook.com")
        .then(() => this.$router.push("/"))
        .catch((e) => {
          this.error = e.message;
        });
    },
    fetchFacebookPages() {
      this.error = undefined;
      this.axios
        .get(
          "https://graph.facebook.com/v10.0/me/accounts?access_token=" +
            this.access_token
        )
        .then(({ data }) => {
          this.facebook_pages = data.data;
        })
        .catch((e) => {
          this.error = e.message;
        });
    },
    fetchProviderData() {
      if (!this.currentUser) {
        this.error = "အကောင့်သို့ဝင်ရန်လိုအပ်သည်။";
        return;
      }
      this.error = undefined;
      this.currentUser.providerData.forEach((provider) => {
        let authProvider = AUTH_PROVIDERS[provider.providerId];
        switch (authProvider) {
          case "Google":
            this.linkedWithGoogle = true;
            break;
          case "Facebook":
            this.linkedWithFacebook = true;
            break;
          case "Email":
            this.linkedWithEmailAndPassword = true;
            break;
        }
      });
    },
  },
  mounted() {
    this.fetchProviderData();
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser;
    },
  },
};
</script>
