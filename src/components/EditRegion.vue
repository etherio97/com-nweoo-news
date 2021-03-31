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
          label="Zawgyi"
          :loading="loading"
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
  }),

  methods: {
    cancel() {
      cancel = true;
      this.edit = false;
    },
  },

  watch: {
    edit(value) {
      if (value === false) {
        if (cancel) return (cancel = false);
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
  },
};
</script>

<style scoped>
tr {
  height: 5rem;
}
</style>
