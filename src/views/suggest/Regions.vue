<template>
  <v-container class="mb-15">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title>
          တိုင်း/ပြည်နယ်ရွေးချယ်ပေးပါ
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="region_state"
            :items="divisions_mm"
            label="တိုင်း/ပြည်နယ်"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card :loading="loading">
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="en">အင်္ဂလိပ်</th>
              <th colspan="2">မြန်မာ</th>
              <th class="edit"></th>
            </tr>
          </thead>
          <tbody>
            <edit-region
              v-for="city in cities"
              :key="city.id"
              :id="city.id"
              :name_en="_(city.name_en)"
              :name_mm="city.name_mm"
              :name_zg="city.name_zg"
            ></edit-region>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import _ from "lodash";
import EditRegion from "@/components/EditRegion.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Regions",

  components: {
    EditRegion,
  },

  data: () => ({
    dialog: false,
    loading: false,
    error: false,
    cities: [],
    region_state: "",
  }),

  methods: {
    _(value) {
      return _.startCase(value);
    },
  },

  computed: {
    ...mapState("regionState", ["divisions"]),
    ...mapGetters("regionState", ["divisions_mm"]),
  },

  watch: {
    region_state(value) {
      this.dialog = false;
      this.loading = true;
      let region_state = this.divisions.find(({ name_mm }) => name_mm == value);
      this.axios(
        `https://nwe-oo-default-rtdb.firebaseio.com/v1/cities.json?orderBy="$key"&startAt="${region_state.id}"&endAt="${region_state.id}\uf8ff"`
      )
        .then(({ data }) => {
          const cities = [];
          const entries = Object.entries(data);
          for (const city of entries) {
            cities.push({ id: city[0], ...city[1] });
          }
          this.cities = cities;
        })
        .catch((e) => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  mounted() {
    this.dialog = true;
  },
};
</script>

<style scoped>
tr th {
  width: 60%;
}

tr th.en {
  width: 30%;
}

tr th.edit {
  width: 10%;
}
</style>
