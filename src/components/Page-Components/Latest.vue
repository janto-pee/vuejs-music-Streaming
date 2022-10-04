<template>
  <div
    class="w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 my-8"
  >
    <div class="border border-2 relative hover-lighten">
      <img
        src="../../assets/img/page component/Selah.png"
        alt=""
        class="w-full"
      />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text font-semibold text-sm">Selah</h3>
        <p class="text-sm text-light-text">Morachi</p>
      </div>
    </div>

    <div class="border border-2 relative hover-lighten">
      <img
        src="../../assets/img/page component/jaywillz.jpeg"
        alt=""
        class="w-full"
      />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text font-semibold text-sm">Till Dawn</h3>
        <p class="text-sm text-light-text">Jaywillz</p>
      </div>
    </div>

    <div class="border border-2 relative hover-lighten">
      <img
        src="../../assets/img/page component/Burna boy.jpeg"
        alt=""
        class="w-full"
      />
      <button
        class="mr-auto absolute bottom-20 right-4 hidden text-color-white"
      >
        <i class="fas fa-circle-play text-3xl"></i>
      </button>
      <div class="bg-color-light-bg p-4">
        <h3 class="text-xl text-color-text font-semibold text-sm">
          Common Person
        </h3>
        <p class="text-sm text-light-text">Burna Boy</p>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../includes/firebase";

export default {
  name: "Latest",
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
