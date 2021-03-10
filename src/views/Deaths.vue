<template>
  <v-container>
    <h2>သေဆုံးသူများ</h2>
    <v-simple-table>
      <thead>
        <tr>
          <th>စဥ်</th>
          <th>နေ့စွဲ</th>
          <th>အမည်</th>
          <th>အသက်</th>
          <th>မှတ်ချက်</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td>{{ num(i + 1) }}။</td>
          <td>{{ date(item.id) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ num(item.age) }} နှစ်</td>
          <td>
            {{ item.region + (item.district ? "၊ " + item.district : "") }}
          </td>
          <td>{{ item.remarks }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import burmeseNumber from "../functions/burmeseNumber";
import { convertMonth } from "../functions/burmeseDate";
import { getPublicURL } from "../functions/database";

export default {
  name: "Deaths",
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
