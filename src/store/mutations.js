export default {
  setUserLogin(state, login){
    state.user.login = login;
  },
  setUserPassword(state, password){
    state.user.password = password;
  },
  setUserIsLogged(state, isLogged){
    state.user.isLogged = isLogged;
  },
  setMessages(state, messages){
    state.messages.messages = messages;
  },
  setFirstLoad(state, firstLoad){
    state.messages.firstLoad = firstLoad;
  }
}
