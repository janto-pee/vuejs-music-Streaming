<template>
  <div class="gap-6 my-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 h-full">
    <div
      class="border border-2 relative p-4 rounded-xl bg-color-light-bg flex flex-col items-center justify-center"
    >
      <img
        src="../../assets/img/people/Adam-Stefancik_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Sarf Lara</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div
      class="border border-2 relative p-4 rounded-xl bg-color-light-bg flex flex-col items-center justify-center"
    >
      <img
        src="../../assets/img/people/Daria-Shevtsova_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Ayomide Solomon</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div
      class="border border-2 relative p-4 rounded-xl bg-color-light-bg flex flex-col items-center justify-center"
    >
      <img
        src="../../assets/img/people/Jack-Orison_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Mark Janis</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div
      class="border border-2 relative p-4 rounded-xl bg-color-light-bg flex flex-col items-center justify-center"
    >
      <img
        src="../../assets/img/people/Marlene-Leppanen_avatar-200x200.jpg"
        alt=""
        class="rounded-full"
      />
      <div class="flex flex-col gap-2 mt-4 items-center">
        <h3 class="text-md text-center text-color-text">Leby Matts</h3>
        <button
          class="px-4 rounded-xl text-center text-sm border-solid border border-color-secondary"
        >
          Chat
        </button>
      </div>
    </div>
    <div
      class="border border-2 relative p-4 rounded-xl bg-color-light-bg flex flex-col items-center justify-center"
    >
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
import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
} from "firebase/firestore";
import { db } from "../../includes/firebase";

export default {
  name: "VerifiedUsers",
  async created() {
    this.getUsers();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      users: [],
      maxLoadValue: 3,
      loading: false,
    };
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfPage) {
        this.getUsers();
      }
    },
    async getUsers() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      const usersRef = collection(db, "usersCollection");

      let querySnapshot;

      if (this.users.length) {
        const lastUser = this.users[this.users.length - 1].docID;
        const docRef = doc(db, "usersCollection", lastUser);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);

        const q = query(
          startAfter(docSnap),
          collection(db, "usersCollection"),
          orderBy("release_date"),
          limit(2)
        );
        querySnapshot = await getDocs(q);
      } else {
        //
        const q = query(
          usersRef,
          orderBy("release_date"),
          limit(this.maxLoadValue)
        );
        querySnapshot = await getDocs(q);
      }

      querySnapshot.forEach((doc) => {
        this.users.push({
          docID: doc.id,
          ...doc.data(),
        });
        this.loading = false;
        console.log(this.users);
      });
    },
  },
};
</script>
