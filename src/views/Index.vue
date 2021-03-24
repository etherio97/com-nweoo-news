<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <video
          id="tvc"
          controls
          preload="auto"
          loop
          muted
          autoplay
          width="100%"
          title="NweOo SMS Reporter - TVC (1)"
        >
          <source
            type="video/mp4"
            src="https://firebasestorage.googleapis.com/v0/b/nwe-oo.appspot.com/o/public%2F2021%2F03%2Fnweoo-sms-reporter-480p.mp4?alt=media&token=73d09c30-bc8d-47d8-a642-b44834345af5"
          />
          <source
            type="video/mp4"
            src="https://firebasestorage.googleapis.com/v0/b/nwe-oo.appspot.com/o/public%2F2021%2F03%2Fnweoo-sms-reporter-720p.mp4?alt=media&token=b2126306-01dc-4fb5-a5e9-74f5ac40db6d"
          />
        </video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
video#tvc {
  max-width: 720px;
  min-width: 320px;
}
</style>
