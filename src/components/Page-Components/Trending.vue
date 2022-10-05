<template>
  <div
    class="w-full grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 my-8"
  >
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/page-component/Wizkid.jpeg" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-sm font-semibold text-color-text">Bad To Me</h3>
        <p class="text-sm text-light-text">Wizkid</p>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/page-component/Electricity.jpeg" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-sm font-semibold text-color-text">Electricity</h3>
        <p class="text-sm text-light-text">Pheelz feat. Davido</p>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/page-component/Bandana.jpeg" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-sm font-semibold text-color-text">Bandana</h3>
        <p class="text-sm text-light-text">Fireboy DML & Asake</p>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/page-component/Call-of-Duty.jpeg" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-sm font-semibold text-color-text">Call of Duty</h3>
        <p class="text-sm text-light-text">Zino</p>
      </div>
    </div>
    <div class="border border-2 relative hover-lighten">
      <img src="../../assets/img/page-component/Rush.png" alt="" />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-sm font-semibold text-color-text">Rush</h3>
        <p class="text-sm text-light-text">Ayra Star</p>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../includes/firebase";

export default {
  name: "Trending",
  async created() {
    this.getSongs();
  },
  data() {
    return {
      songs: [],
      maxLoadValue: 3,
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
