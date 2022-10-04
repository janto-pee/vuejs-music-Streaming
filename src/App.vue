<template>
  <!-- Navigation -->
  <app-navigation />
  <!-- main -->
  <section class="relative top-16">
    <!-- aside -->
    <app-sidebar />
    <!-- contents -->
    <div
      class="relative w-full lg:w-[calc(100%-12rem)] lg:left-48 px-4 py-8 lg:px-16 lg:py-8 mb-24 bg-color-white min-h-screen"
    >
      <!-- ROUTER VIEW -->
      <router-view></router-view>

      <!-- authentication -->
      <app-auth />

      <!-- Player -->
      <div
        class="fixed w-full bg-color-light-bg h-20 md:h-16 bottom-0 left-0 z-30 flex items-center"
        v-if="currentSong.modified_name"
      >
        <app-player />
      </div>
    </div>
  </section>
</template>

<script>
import AppNavigation from "./components/Navbar.vue";
import AppSidebar from "./components/Sidebar.vue";
import AppAuth from "./components/Authentication.vue";
import AppPlayer from "./components/SongPlayer.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppNavigation,
    AppSidebar,
    AppAuth,
    AppPlayer,
  },
  created() {
    this.$store.dispatch("init_login");
  },
  computed: {
    ...mapState(["currentSong"]),
  },
};
</script>

<style></style>
