export default {
  getUserLogin (state) {
    return state.user.login;
  },
  getUserPassword (state) {
    return state.user.password;
  },
  isUserLogged (state) {
    return state.user.isLogged;
  },
  getMessages (state) {
    return state.messages.messages;
  },
  isFirstLoad (state) {
    return state.messages.firstLoad;
  }
}
