<template>
  <tr>
    <td lang="en">
      <v-row justify="space-between">
        <v-text-field
          lang="en"
          v-model="value_en"
          :disabled="!edit"
          label="English"
          :loading="loading"
        ></v-text-field>
      </v-row>
    </td>
    <td lang="mm">
      <v-row justify="space-between" class="my-2 py-0">
        <v-text-field
          lang="mm"
          v-model="value_mm"
          :disabled="!edit"
          label="Unicode"
          :loading="loading"
        ></v-text-field>
      </v-row>
    </td>
    <td lang="zg">
      <v-row justify="space-between">
        <v-text-field
          lang="zg"
          v-model="value_zg"
          :disabled="!edit"
          :label="`Zawgyi${name_zg ? '' : ' (auto converted)'}`"
          :loading="loading"
          @input="auto_convert = false"
        ></v-text-field>
      </v-row>
    </td>
    <td>
      <v-btn class="ml-1" @click="edit = !edit" text icon small color="primary">
        <v-icon v-if="loading" v-text="''" />
        <v-icon v-else v-text="edit ? 'mdi-content-save' : 'mdi-pencil'" />
      </v-btn>
      <v-btn
        v-show="edit"
        class="ml-1"
        text
        icon
        small
        color="error"
        @click="cancel"
      >
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { uni2zg } from "@/functions/rabbit";

let cancel;

export default {
  name: "EditRegion",
  props: {
    id: {
      type: String,
    },
    name_mm: {
      type: String,
    },
    name_en: {
      type: String,
    },
    name_zg: {
      type: String,
    },
  },

  data: () => ({
    edit: false,
    value_en: "",
    value_mm: "",
    value_zg: "",
    loading: false,
    auto_convert: true,
  }),

  methods: {
    cancel() {
      cancel = true;
      this.edit = false;
    },
  },

  watch: {
    value_mm(value) {
      if (!this.auto_convert) return;
      this.value_zg = uni2zg(value);
    },
    edit(value) {
      if (value === false) {
        if (cancel) {
          this.value_en = this.name_en;
          this.value_mm = this.name_mm;
          this.value_zg = this.name_zg;
          cancel = false;
          return;
        }
        this.loading = true;
        this.axios
          .patch(
            `https://nwe-oo-default-rtdb.firebaseio.com/v1/cities/${this.id}.json`,
            {
              name_en: this.value_en,
              name_mm: this.value_mm,
              name_zg: this.value_zg,
            }
          )
          .then(() => {
            this.name_en = this.value_en;
            this.name_mm = this.value_mm;
            this.name_zg = this.value_zg;
            this.auto_convert = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },

  mounted() {
    this.value_en = this.name_en;
    this.value_mm = this.name_mm;
    this.value_zg = this.name_zg;
    this.auto_convert = true;
  },
};
</script>

<style scoped>
tr {
  height: 5rem;
}
</style>
