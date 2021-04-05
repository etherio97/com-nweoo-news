<template>
  <v-container class="mt-4 mb-15">
    <v-form ref="form" @submit.prevent="save">
      <v-card elevation="0">
        <v-card-title>
          အသံဖိုင်ထည့်သွင်းခြင်း
        </v-card-title>
        <v-card-text>
          <v-progress-linear
            class="mt-2 mb-4"
            v-show="!uploaded && uploading"
            :value="percentage"
          />
          <v-file-input
            label="အသံဖိုင်"
            outlined
            v-model="file"
            accept="audio/mp3"
            :rules="[rules.required]"
            :disabled="uploaded || uploading"
            :append-icon="file ? 'mdi-upload' : ''"
            @click:append="upload"
            :loading="!uploaded && uploading"
          />

          <v-text-field
            label="ခေါင်းစဥ်"
            outlined
            v-model="title"
            :rules="[rules.required]"
            append-icon="mdi-reload"
            @click:append="toUnicode(title)"
          />
          <v-text-field
            label="ကြာမြင့်ချိန် (စက္ကန့်)"
            hint="eg. 14.43232"
            v-model="duration"
            readonly
            outlined
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="primary"
            depressed
            :loading="loading"
            :disabled="!uploaded"
            dark
          >
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { zg2uni } from "@/functions/rabbit";
import _ from "lodash";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default {
  name: "AddVoicemail",
  data: () => ({
    error: null,
    title: "",
    duration: 0,
    file: null,
    src: null,
    rules: {
      required: (value) => !!value,
    },
    uploaded: false,
    uploading: false,
    loading: false,
    percentage: 0,
  }),
  methods: {
    toUnicode(value) {
      this.title = zg2uni(value);
    },

    save() {
      const form = this.$refs.form;
      this.error = null;
      this.loading = true;
      if (!form.validate()) {
        this.loading = false;
        return;
      }
      const data = {
        title: this.title,
        duration: this.duration,
        src: this.src,
      };
      this.axios
        .post(`${this.$root.api}/voicemails`, data)
        .then(() => this.$router.push("/admin/voicemails"))
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => (this.loading = false));
    },

    upload() {
      this.error = null;
      if (!this.file) return;
      const ref = firebase
        .storage()
        .ref("/public/voicemail/recordings")
        .child(this.file.name);
      const upload = ref.put(this.file);
      this.title = _.startCase(this.file.name.replace(/\.mp3$/, ""));
      this.uploading = true;
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        ({ bytesTransferred, totalBytes }) => {
          let percentage = (bytesTransferred / totalBytes) * 100;
          this.percentage = parseFloat(percentage.toFixed(2));
        }
      );
      upload
        .then(() =>
          ref.getDownloadURL().then((url) => {
            const aux = new Audio(url);
            this.src = url;
            this.uploaded = true;
            aux.addEventListener("canplay", () => {
              this.duration = aux.duration;
            });
          })
        )
        .catch((e) => (this.error = e.message))
        .finally(() => (this.uploading = false));
    },
  },
};
</script>

<style></style>
