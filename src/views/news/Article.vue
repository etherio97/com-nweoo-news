<template>
  <v-container> </v-container>
</template>

<script>
export default {
  name: "Article",
  data: () => ({
    title: undefined,
    source: undefined,
    content: undefined,
    image: undefined,
    post_id: undefined,
    video_id: undefined,
    timestamp: undefined,
  }),
  beforeMount() {
    //
  },
};
</script>
