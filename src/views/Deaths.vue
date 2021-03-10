<template>
  <v-container>
    <h2 class="mt-2 mb-4">သေဆုံးသူများ</h2>
    <v-row class="mx-auto">
      <v-col cols="12" v-if="mode">
        <v-chip
          color="red darken-2"
          dark
          style="text-transform: capitalize"
          close
          @click:close="mode = null"
        >
          {{ mode }}: {{ value }}
        </v-chip>
      </v-col>
      <template v-for="(item, i) in items" :v-if="item.visible">
        <v-col cols="12" sm="6" md="4" lg="3" xl="3" :key="i">
          <fallen-star-card
            :id="item.id"
            :name="item.name"
            :age="item.age"
            :image="item.image"
            :region="item.region"
            :district="item.district"
            :reason="item.reason"
            :remarks="item.remarks"
            :filterByDate="filterByDate.bind(this)"
            :filterByRegion="filterByRegion.bind(this)"
            :filterByCase="filterByCase.bind(this)"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { convertMonth } from "../functions/burmeseDate";
import { getPublicURL } from "../functions/database";
import burmeseNumber from "../functions/burmeseNumber";
import FallenStarCard from "../components/FallenStarCard.vue";

const components = {
  FallenStarCard,
};

export default {
  name: "Deaths",
  components,
  data: () => ({
    total: 0,
    items: [],
    deaths: [],
    mode: null,
    value: null,
  }),
  methods: {
    date(d) {
      const dt = new Date(parseInt(d));
      return `${convertMonth(dt.getMonth())}လ ${burmeseNumber(dt.getDate())}`;
    },
    fetchFallenStars() {
      const url = getPublicURL("fallen-stars");
      return this.axios(url).then((res) =>
        Object.entries(res.data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .reverse()
      );
    },
    num(n) {
      return burmeseNumber(n);
    },
    filterByCase(reason) {
      this.value = reason;
      this.mode = "case";
    },
    filterByRegion(region) {
      this.value = region;
      this.mode = "region";
    },
    filterByDate(date) {
      this.value = parseInt(date);
      this.mode = "date";
    },
  },
  watch: {
    mode(value) {
      if (value) {
        this.items = this.deaths.filter((item) => {
          if (this.mode === "date") {
            const a = new Date(parseInt(this.value));
            const b = new Date(parseInt(items[id]));
            const x = [a.getMonth(), a.getDate(), a.getFullYear()];
            const z = [b.getMonth(), b.getDate(), b.getFullYear()];
            return (
              x[0] == this.value[0] &&
              x[1] === this.value[1] &&
              x[2] === this.value[2]
            );
          }
          return item[value] == this.value;
        });
      } else {
        this.items = this.deaths;
      }
    },
  },
  async beforeMount() {
    this.deaths = this.items = await this.fetchFallenStars();
  },
};
</script>
