import Vue from "vue";
import Vuex from "vuex";
import { getAuth } from "firebase/auth";
import { dbService } from "../firebase/firebaseInit";
import { doc, getDoc } from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogData: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogData: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogData: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogData: "May 1, 2021",
      },
    ],
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await doc(dbService, "users", getAuth().currentUser.uid);
      const dbResults = await getDoc(dataBase);
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      console.log(dbResults.data());
    },
  },
  modules: {},
});
