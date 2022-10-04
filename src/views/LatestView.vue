<template>
  <!-- Featured -->
  <h1 class="text-2xl font-semibold pt-2 pb-4">New Release</h1>
  <div
    class="grid grid-cols-1 my-2 min-h-full bg-color-white"
    v-for="(song, index) in songs"
    :key="song.docID"
  >
    <router-link
      :to="{ name: 'song', params: { id: song.docID } }"
      class="bg-color-light-bg w-full p-2 rounded-md border my-4"
    >
      <div
        class="flex flex-col gap-8 md:gap-2 md:flex-row md:items-center md:justify-between"
      >
        <div class="basis-4/12 flex gap-6 items-center px-2">
          <span class="hidden md:flex">{{ index }}</span>
          <div
            alt=""
            class="bg-[url(./assets/img/recommended/Artboard-39.png)] bg-cover relative w-16 h-16 rounded-md md:w-8 md:h-8 flex relative chart-hover"
          >
            <button
              class="opacity-0 absolute bottom-0 right-4 text-color-white text-lg"
            >
              <i class="fas fa-circle-play"></i>
            </button>
          </div>
          <div>
            <h3 class="text-sm">{{ song.modified_name }}</h3>
            <small>Hellyson</small>
          </div>
        </div>

        <div
          class="basis-5/12 flex items-center justify-between gap-4 px-2 mt-4"
        >
          <div class="flex items-center gap-4 w-full">
            <div
              class="basis-5/6 bg-color-white h-2"
              @click.prevent="updateSeek"
            >
              <div class="flex h-full bg-red-500 w-1/3"></div>
            </div>
          </div>
        </div>

        <div class="basis-3/12 flex gap-4 justify-between md:justify-end">
          <a href="" class="flex gap-2 items-center">
            <i class="fa fa-download text-color-text text-sm"></i>
            <small>36.4k</small>
          </a>
          <a href="" class="flex gap-2 items-center">
            <i class="fas fa-heart text-color-secondary text-sm"></i>
            <small>19.4k</small>
          </a>
          <a href="" class="flex gap-2 items-center">
            <i class="fas fa-comment text-sm"></i>
            <small>19.4k</small>
          </a>
        </div>
      </div>
    </router-link>
  </div>
  <div
    class="flex items-center justify-center"
    :class="{ hidden: !pendingRequest }"
  >
    <img src="../assets/img/Infinity-loader.svg" alt="" class="h-16" />
    <span class="text-md" v-if="show_request_error">{{ request_error }}</span>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LatestView",
  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapState(["seek", "duration", "playerProgress", "currentSong"]),
  },
  data() {
    return {
      songs: [],
      maxLoadValue: 8,
      pendingRequest: false,
      request_error: "",
      show_request_error: false,
    };
  },
  methods: {
    ...mapActions(["toggleAudio", "updateSeek"]),
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfPage) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;

      let values = {
        songs: this.songs,
        maxLoadValue: this.maxLoadValue,
        order: "release_date",
      };
      try {
        await this.$store.dispatch("infiniteScroll", values);
      } catch (error) {
        this.request_error = `pendingRequestfailed - ${error.message}`;
      }

      this.pendingRequest = false;
      console.log(this.songs);
    },
  },
};
</script>
