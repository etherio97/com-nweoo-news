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
      <v-btn @click="edit = !edit" text icon small>
        <v-icon class="ml-2" v-if="loading" v-text="''" />
        <v-icon
          class="ml-2"
          v-text="edit ? 'mdi-content-save' : 'mdi-pencil'"
          v-else
        />
      </v-btn>
    </td>
  </tr>
</template>

<script>
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

  watch: {
    edit(value) {
      if (value === false) {
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
