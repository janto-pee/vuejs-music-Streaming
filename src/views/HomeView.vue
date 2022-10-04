<template>
  <!-- <h1 class="text-4xl font-semibold pt-4">New Release</h1> -->
  <div class="my-4 flex items-center gap-2">
    <a href="#" class="bg-color-white p-2 rounded-md border">New Release</a>
    <a href="#">Tracks</a>
    <a href="#">Albums</a>
  </div>
  <!-- New Releases -->
  <app-latest />

  <!-- Playlist -->
  <h1 class="text-2xl font-semibold pt-6">Trending</h1>
  <app-trending />

  <!-- Radio For You -->
  <h1 class="text-2xl font-semibold pt-6">MixTape</h1>
  <app-mixtape />

  <!-- Radio For You -->
  <h1 class="text-2xl font-semibold pt-6">Users</h1>
  <app-users />

  <!-- Radio For You -->
  <h1 class="text-2xl font-semibold pt-6">Gospel</h1>
  <app-gospel />
</template>

<script>
import AppTrending from "../components/Page-Components/Trending.vue";
import AppMixtape from "../components/Page-Components/Mixtape.vue";
import AppGospel from "../components/Page-Components/Gospel.vue";
import AppLatest from "../components/Page-Components/Latest.vue";
import AppUsers from "../components/Page-Components/Verified-Users.vue";

export default {
  name: "Home",
  components: {
    AppTrending,
    AppMixtape,
    AppGospel,
    AppLatest,
    AppUsers,
  },
};
</script>

<style></style>
