<template>
  <v-container>
    <h2 class="mt-2 mb-4">သေဆုံးသူများ</h2>
    <v-row class="mx-auto">
      <template v-for="(item, i) in items">
        <v-col cols="12" sm="6" md="4" lg="3" xl="3" :key="i">
          <fallen-star-card
            :id="item.id"
            :name="item.name"
            :age="item.age"
            :image="item.image"
            :region="item.region"
            :district="item.district"
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
  },
  async beforeMount() {
    this.items = await this.fetchFallenStars();
  },
};
</script>
