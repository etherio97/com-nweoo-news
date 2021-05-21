<template>
  <v-combobox
    solo
    v-model="q"
    :loading="loading"
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    :hint="
      profiler
        ? `ရှာဖွေချိန် ${profiler}ms ကြာမြင့်ပြီး ရလဒ် ${results.length} ခုရှာဖွေတွေ့ရှိခဲ့ပါသည်။`
        : ''
    "
    hide-no-data
    :items="results"
    persistent-hint
  >
    <template v-slot:item="{ index, item }">
      <v-list-item :to="`/articles/${item.id}`" :key="index">
        <v-chip small color="red lighten-2" light v-show="item.score > 0.5">
          Relevant
        </v-chip>
        <v-chip small class="mx-2" color="grey lighten-3" light>
          {{ item.source }}
        </v-chip>
        <p>{{ item.title }}</p>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: "SearchInput",
  data: () => ({
    error: undefined,
    loading: false,
    focus: false,
    q: undefined,
    profiler: undefined,
    results: [],
  }),
  watch: {
    q(value) {
      let profileStart = Date.now();
      this.loading = true;
      this.error = null;
      this.axios
        .get(`${this.$root.api}/search?q=${value}`)
        .then(({ data }) => {
          this.profiler = Date.now() - profileStart;
          this.results = data;
        })
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
