import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isSignIn: localStorage.getItem("userIsSignIn") ? localStorage.getItem("userIsSignIn") : false,
      accessToken: localStorage.getItem("userAccessToken") ? localStorage.getItem("userAccessToken") : null,
      expiredSeconds: -1,
      avatar: localStorage.getItem("userAvatar") ? localStorage.getItem("userAvatar") : null,
      name: localStorage.getItem("userName") ? localStorage.getItem("userName") : null,
      role: localStorage.getItem("userRole") ? localStorage.getItem("userRole") : null
    },
    notebooks: [],
    notes: [],
    note: {}
  },
  mutations: {
    setNotebooks(state, _notebooks) {
      state.notebooks = _notebooks;
    },
    setNotes(state, _notes) {
      state.notes = _notes;
    },
    setNote(state, _note) {
      state.note = _note;
    },
    setNoteTitle(state, title) {
      // update note title
      state.note.title = title;
      // update notes title
      state.notes.forEach(item => {
        if (state.note.id === item.draftId) {
          item.title = title;
        }
      });
    },
    setNoteContent(state, content) {
      state.note.content = content;
    },

    setNoteStatus(state, noteStatus) {
      state.note.status = noteStatus;
    },
    setNotesStatus(state, boolean) {
      state.note.status[0] = boolean;
    },

    /*****************************************************************************/
    setAccessToken(state, accessToken) {
      state.user.accessToken = accessToken;
    },

    setIsSignIn(state, boolean) {
      state.user.isSignIn = boolean;
    },

    setUserName(state, username) {
      state.user.name = username;
    },

    setUserAvatar(state, userAvatar) {
      state.user.avatar = userAvatar;
    },

    setUserRole(state, userRole) {
      state.user.role = userRole;
    }

    /*****************************************************************************/

  },
  getters: {
    getAccessToken(state) {
      return state.user.accessToken;
    },

    userAccessToken(state) {
      return state.user.accessToken;
    },
    userIsSignIn: state => {
      return state.user.isSignIn;
    },

    userAvatar: state => {
      return state.user.avatar;
    },

    userName: state => {
      return state.user.name;
    },

    userRole: state => {
      return state.user.role;
    }
  },
  actions: {}
});
