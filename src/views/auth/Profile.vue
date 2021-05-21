<template>
  <v-container class="mt-4">
    <h2 class="h2 mb-4">သင့်အကောင့်</h2>
    <v-row justify="space-between" align="start">
      <v-col sm="5" cols="12" class="text-center">
        <v-avatar
          class="profile"
          color="grey"
          size="200"
          @click="readonly || askPhotoURL()"
        >
          <v-img :src="avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col sm="7" cols="12">
        <v-text-field
          v-model="name"
          label="သင့်နာမည်"
          :readonly="readonly"
          outlined
          ref="displayName"
          value=" "
        />
        <v-text-field
          v-model="email"
          label="သင့်အီးမေးလ်"
          value=" "
          :readonly="readonly"
          outlined
        />
        <v-row class="pr-4">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :color="readonly ? 'secondary lighten-2' : 'primary'"
            depressed
            @click="readonly = !readonly"
          >
            <v-icon
              class="pr-2"
              small
              v-text="readonly ? 'mdi-pencil' : 'mdi-content-save'"
            ></v-icon>
            <span v-text="readonly ? 'ပြင်ရန်' : 'သိမ်းရန်'"></span>
          </v-btn>
        </v-row>
      </v-col>
<!--
      <v-col cols="12" sm="6">
        <v-btn
          v-if="!linkedWithGoogle"
          @click="linkWithGoogle"
          class="mt-3 mb-3 font-weight-bold"
          color="red"
          dark
          block
        >
          <v-icon class="pr-2" small>mdi-google</v-icon> ဖြင့်ချိတ်ဆက်ရန်
        </v-btn>
        <v-btn
          v-else
          @click="unlinkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="red"
          dark
          text
        >
          <v-icon small class="pr-2">mdi-google</v-icon>
          ဖြင့်ချိတ်ဆက်မှုဖြုတ်ရန်​
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          v-if="!linkedWithFacebook"
          @click="linkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="blue darken-2"
          dark
          block
        >
          <v-icon small class="pr-2">mdi-facebook</v-icon> ဖြင့်ချိတ်ဆက်ရန်
        </v-btn>
        <v-btn
          v-else
          @click="unlinkWithFacebook"
          class="mt-3 mb-3 font-weight-bold"
          color="blue darken-2"
          dark
          text
        >
          <v-icon small class="pr-2">mdi-facebook</v-icon>
          ဖြင့်ချိတ်ဆက်မှုဖြုတ်ရန်​
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div style="height: 60px"></div>
        <!-- <delete-profile-modal /> -->
      </v-col> -->
    </v-row>

    <v-overlay :value="!loaded" opacity="1" color="white darken-1">
      <v-progress-circular indeterminate size="168" color="primary" />
    </v-overlay>
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
    readonly: true,
    loaded: false,
    loading: false,
    linkedWithGoogle: false,
    linkedWithFacebook: false,
    linkedWithEmailAndPassword: false,
    access_token: undefined,
    facebook_pages: [],
    avatar: undefined,
    name: undefined,
    email: undefined,
  }),
  methods: {
    askPhotoURL() {
      this.avatar = prompt("Enter your profile image URL", this.avatar || "");
      this.avatar && this.currentUser.updateProfile({ photoURL: this.avatar });
    },
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
      this.loaded = true;
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
    setTimeout(() => {
      this.avatar = this.currentUser.photoURL;
      this.name = this.currentUser.displayName;
      this.email = this.currentUser.email;
      this.fetchProviderData();
    }, 3000);
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser;
    },
  },
  watch: {
    readonly(value) {
      if (!value) return;
      let user = this.currentUser;
      if (this.name !== user.displayName) {
        user.updateProfile({ displayName: this.name });
      }
      if (this.email !== user.email) {
        user.updateEmail(this.email).then(() => {
          user.sendEmailVerification();
        });
      }
    },
  },
};
</script>
