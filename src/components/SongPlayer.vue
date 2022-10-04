<template>
  <div class="w-full md:w-12/12" v-if="currentSong.modified_name">
    <div class="flex justify-between gap-2 items-center mx-2 mb-2">
      <!-- left -->
      <div class="flex basis-4/6 sm:basis-2/6 gap-2 items-center">
        <img
          src="{{ currentSong.display_picture }}"
          alt=""
          class="hidden md:flex w-12 h-12"
        />
        <div class="flex flex-col">
          <h5 class="text-sm font-bold">{{ currentSong.modified_name }}</h5>
          <p>{{ currentSong.artist }}</p>
        </div>
      </div>
      <!-- center -->
      <div class="basis-3/6 hidden md:flex">
        <div class="flex items-center gap-4 w-full">
          <span class="">{{ seek }}</span>
          <div class="basis-5/6 bg-color-white h-2" @click.prevent="updateSeek">
            <div
              class="flex h-full bg-red-500"
              :style="{ width: playerProgress }"
            ></div>
          </div>
          <span>{{ duration }}</span>
        </div>
      </div>
      <!-- right -->
      <div class="flex items-center justify-end sm:basis-1/6">
        <div class="flex items-center justify-end gap-8">
          <button
            class="justify-center items-center"
            @click.prevent="toggleAudio"
          >
            <i
              class="fa text-4xl"
              :class="{ 'fa-circle-play': !playing, 'fa-pause': playing }"
            ></i>
          </button>
          <button class="justify-center items-center">
            <i class="fas fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Player",
  data() {
    return {
      player_length: "full_screen",
    };
  },
  computed: {
    ...mapGetters(["playing"]),
    ...mapState(["seek", "duration", "playerProgress", "currentSong"]),
  },
  methods: {
    ...mapActions(["toggleAudio", "updateSeek"]),
  },
};
</script>

<style></style>
