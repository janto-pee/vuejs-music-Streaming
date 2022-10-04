<template>
  <!-- header -->
  <div class="flex flex-col sm:flex-row items-start gap-8 bg-[#141E27] p-4">
    <img
      src="../assets/img/Artboard-1.png"
      alt=""
      class="w-full sm:w-52 sm:h-52 rounded-md"
    />
    <div class="flex flex-col sm:h-52 justify-between">
      <h1 class="text-3xl font-semibold">{{ song.artist }}</h1>
      <div class="">
        <div class="flex items-center my-4 gap-6">
          <img
            src="../assets/img/Artboard-51.png"
            alt=""
            class="w-8 h-8 rounded-full"
          />
          <h1 class="text-xl">Pheelz</h1>
        </div>
        <div
          class="grid sm:hidden lg:grid grid-cols-5 items-center gap-4 w-full"
        >
          <button
            @click.prevent="newSong(song)"
            class="flex gap-4 bg-color-secondary rounded-md py-2 px-6 sm:px-8 justify-center items-center"
          >
            <i class="fas fa-play"></i>
            <span class="hidden xl:flex">Play</span>
          </button>
          <button
            class="flex gap-4 bg-gray-400 rounded-md py-2 px-6 sm:px-8 justify-center items-center"
          >
            <i class="fas fa-heart"></i>
            <span class="hidden xl:flex">46.4k</span>
          </button>
          <button
            class="flex gap-4 bg-gray-400 rounded-md py-2 px-6 sm:px-8 justify-center items-center"
          >
            <i class="fas fa-share"></i>
            <span class="hidden xl:flex">34.1k</span>
          </button>
          <button
            class="flex gap-4 bg-gray-400 rounded-md py-2 px-6 sm:px-8 justify-center items-center"
          >
            <i class="fas fa-comment"></i>
            <span class="hidden xl:flex">20.5k</span>
          </button>
          <button
            class="flex gap-4 bg-gray-400 rounded-md py-2 px-6 sm:px-8 justify-center items-center"
          >
            <i class="fas fa-download"></i>
            <span class="hidden xl:flex">20k</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Lyrics -->
  <div class="lg:w-1/2 my-8">
    <h4 class="text-xl mb-4 font-semibold">Lyrics</h4>
    <p>No lyrics yet</p>
  </div>
  <!-- Similar Songs -->
  <div class="my-8">
    <h4 class="text-xl mb-4 font-semibold">Similar Songs</h4>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <div class="gap-4">
        <img src="../assets/img/Artboard-3.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-30.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-51.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-1.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-3.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-30.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-3.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-1.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-3.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
      <div class="gap-4">
        <img src="../assets/img/Artboard-51.png" alt="" class="rounded-md" />
        <h3 class="text-md">One Life</h3>
      </div>
    </div>
  </div>
  <!-- Comments -->
  <app-comments />
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../includes/firebase";
import AppComments from "../components/Comments.vue";
import { mapActions } from "vuex";

export default {
  name: "Song",
  components: {
    AppComments,
  },
  data() {
    return {
      song: {},
    };
  },
  async created() {
    const songRef = doc(db, "songsCollection", this.$route.params.id);
    const docSnap = await getDoc(songRef);

    if (!docSnap.exists()) {
      this.$router.push({ name: "home" });
      return;
    }
    this.song = docSnap.data();
    console.log(this.song);
  },
  methods: {
    ...mapActions(["newSong"]),
  },
};
</script>
