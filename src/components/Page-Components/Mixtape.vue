<template>
  <div class="w-full grid xs:grid-cols-2 md:grid-cols-4 gap-6 my-8">
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/online-radio/Artboard-37.png" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text">Real Kings Mix</h3>
        <p class="text-sm text-light-text">Dj Antivirus</p>
      </div>
    </div>
    <!--  -->
    <div class="border border-2 relative">
      <img src="../../assets/img/online-radio/Artboard-44.png" alt="" />
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text">Ice Beat</h3>
        <p class="text-sm text-light-text">Dj Sturny</p>
      </div>
      <div
        class="hidden absolute w-full h-full top-0 left-0 bg-gradient-to-r from-pink-500 to-yellow-500"
      >
        <button class="mr-auto relative top-1/2 left-20 text-color-white">
          <i class="fas fa-circle-play text-3xl"></i>
        </button>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/online-radio/Artboard-58.png" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text">Ha Wahala Beat</h3>
        <p class="text-sm text-light-text">Dj Cora</p>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/online-radio/Artboard-61.png" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text">Sound Wave</h3>
        <p class="text-sm text-light-text">Heysong</p>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../includes/firebase";

export default {
  name: "Mixtape",
  async created() {
    this.getSongs();
  },
  data() {
    return {
      songs: [],
      maxLoadValue: 5,
    };
  },
  methods: {
    async getSongs() {
      const songsRef = collection(db, "songsCollection");
      //
      const q = query(songsRef, orderBy("downloads"), limit(this.maxLoadValue));
      let querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        this.songs.push({
          docID: doc.id,
          ...doc.data(),
        });
        console.log(this.songs);
      });
    },
  },
};
</script>
