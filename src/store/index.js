import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../includes/firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Howl } from "howler";
import Time from "../includes/TimeFormat";

export default createStore({
  state: {
    authModal: false,
    userLoggedIn: false,
    mobileMenu: false,
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  },

  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },

  mutations: {
    toggleAuthModal: (state) => {
      state.authModal = !state.authModal;
    },

    toggleUserLoggedIn: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenu = !state.mobileMenu;
    },

    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },

    updateProgress: (state) => {
      state.seek = Time.formatTime(state.sound.seek());
      state.duration = Time.formatTime(state.sound.duration());
      state.playerProgress = `${
        (state.sound.seek() / state.sound.duration()) * 100
      }%`;
    },
  },
  actions: {
    async register(context, payload) {
      // registering a new user
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      await setDoc(doc(db, "userCollection", auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await updateProfile(auth.currentUser, {
        displayName: payload.email,
      });

      context.commit("toggleUserLoggedIn");
    },

    async login(context, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      context.commit("toggleUserLoggedIn");
    },

    async signOut(context) {
      await signOut(auth);
      context.commit("toggleUserLoggedIn");
    },

    init_login(context) {
      let user = auth.currentUser;

      if (user) {
        context.commit("toggleUserLoggedIn");
      }
    },

    async comment(context, payload) {
      // although add is preferable
      await addDoc(collection(db, "commentsCollection"), payload);
    },

    async infiniteScroll(context, payload) {
      let querySnapshot;
      if (payload.songs.length) {
        const lastSong = payload.songs[payload.songs.length - 1].docID;
        const docRef = doc(db, "songsCollection", lastSong);
        const docSnap = await getDoc(docRef);

        const q = query(
          collection(db, "songsCollection"),
          orderBy(payload.order),
          startAfter(docSnap),
          limit(payload.maxLoadValue)
        );
        querySnapshot = await getDocs(q);
      } else {
        //
        const q = query(
          collection(db, "songsCollection"),
          orderBy(payload.order),
          limit(payload.maxLoadValue)
        );
        querySnapshot = await getDocs(q);
      }
      querySnapshot.forEach((doc) => {
        payload.songs.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },

    async newSong(context, payload) {
      if (context.state.sound instanceof Howl) {
        context.state.sound.unload();
      }
      context.commit("newSong", payload);

      context.state.sound.play();

      context.state.sound.on("play", () => {
        requestAnimationFrame(() => {
          context.dispatch("progress");
        });
      });
    },

    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
        return;
      } else {
        state.sound.play();
      }
    },

    progress(context) {
      context.commit("updateProgress");

      if (this.state.sound.playing()) {
        requestAnimationFrame(() => {
          context.dispatch("progress");
        });
      }
    },

    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      state.sound.once("seek", () => {
        dispatch("progress");
      });
    },
  },
});
