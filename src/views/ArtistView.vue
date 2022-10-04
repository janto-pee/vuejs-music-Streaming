<template>
  <div class="gap-6 my-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 h-full">
    <div class="border border-2 relative p-4 rounded-xl bg-color-light-bg">
      <img
        src="../../assets/img/people/Adam-Stefancik_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div class="border border-2 relative p-4 rounded-xl bg-color-light-bg">
      <img
        src="../../assets/img/people/Daria-Shevtsova_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div class="border border-2 relative p-4 rounded-xl bg-color-light-bg">
      <img
        src="../../assets/img/people/Jack-Orison_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div class="border border-2 relative p-4 rounded-xl bg-color-light-bg">
      <img
        src="../../assets/img/people/Marlene-Leppanen_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div class="border border-2 relative p-4 rounded-xl bg-color-light-bg">
      <img
        src="../../assets/img/people/Adam-Stefancik_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../includes/firebase";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export default {
  name: "ArtistView",
  async created() {
    this.getusers();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      users: [],
      maxLoadValue: 8,
      loading: false,
    };
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfPage) {
        this.getusers();
      }
    },
    async getusers() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      let querySnapshot;

      if (this.users.length) {
        const lastUser = this.users[this.users.length - 1].docID;
        const docRef = doc(db, "usersCollection", lastUser);
        const docSnap = await getDoc(docRef);

        const q = query(
          collection(db, "usersCollection"),
          orderBy("downloads"),
          startAfter(docSnap),
          limit(this.maxLoadValue)
        );
        querySnapshot = await getDocs(q);
      } else {
        //
        const q = query(
          collection(db, "usersCollection"),
          orderBy("modified_name"),
          limit(this.maxLoadValue)
        );
        querySnapshot = await getDocs(q);
      }

      this.pendingRequest = false;
      console.log(this.users);
    },
  },
};
</script>

<style></style>
