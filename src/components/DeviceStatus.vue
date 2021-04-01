<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ attr, on }">
      <v-chip class="mx-2" v-on="on" v-bind="attr" small dark>
        <v-icon :color="color" small class="mr-2">
          {{ is_charging ? "mdi-cellphone" : "mdi-cellphone-off" }}
        </v-icon>
        {{ status }}
      </v-chip>
    </template>
    <span> {{ parseInt(battery_level) }}% </span>
    <code>
      {{ is_charging ? "charging" : "discharging" }}
      (Last Synced
      {{ new Date(last_synced).toLocaleString() }})
    </code>
  </v-tooltip>
</template>

<script>
let _t;

export default {
  name: "DeviceStatus",
  data: () => ({
    error: null,
    is_online: null,
    last_synced: null,
    is_charging: null,
    battery_level: 0,
  }),
  computed: {
    status() {
      if (this.last_synced === null || this.error) return "connecting";
      return this.is_online ? "online" : "offline";
    },
    color() {
      switch (this.status) {
        case "online":
          return "success";

        case "offline":
          return "error";

        default:
          return "gray";
      }
    },
  },
  methods: {
    fetchStatus() {
      let url =
        `${this.$root.api}/status?` +
        `times=${this.$root.times++}&ga=${this.$root.ga}`;

      if (!window.navigator.onLine) {
        return (_t = setTimeout(() => this.fetchStatus(), 15000));
      }

      return this.axios
        .get(url)
        .then(({ data }) => {
          this.error = null;
          this.is_online = data.is_online;
          this.last_synced = data.last_synced;
          this.is_charging = data.is_charging;
          this.battery_level = data.battery_level;
        })
        .catch((e) => {
          this.error = true;
        })
        .finally(() => (_t = setTimeout(() => this.fetchStatus(), 15000)));
    },
  },
  beforeMount() {
    this.fetchStatus();
  },
  beforeDestroy() {
    _t && clearTimeout(_t);
  },
};
</script>
