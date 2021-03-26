<template>
  <v-card>
    <v-card-text>
      <span>{{ time }}</span> - {{ message }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-menu bottom>
        <template v-slot:activator="{ attr, on }">
          <v-btn
            v-on="on"
            v-bind="attr"
            color="error darken-2"
            text
            small
            v-show="!deleted"
          >
            <v-icon class="pr-1" small>mdi-flag</v-icon> Report
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <router-link :to="`/report/${this.id}?action=request`">
                ပယ်ဖျက်ရန်တောင်းဆိုပါ
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="`/report/${this.id}?action=delete`">
                ချက်ချင်းပယ်ဖျက်ပါ
              </router-link>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ReporterCard",
  props: {
    deleted: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    time() {
      const date = new Date(this.timestamp);
      const hour =
        date.getHours() > 9
          ? date.getHours().toString()
          : "0" + date.getHours().toString();
      const min =
        date.getMinutes() > 9
          ? date.getMinutes().toString()
          : "0" + date.getMinutes().toString();
      return `${hour}:${min}`;
    },
  },
};
</script>
