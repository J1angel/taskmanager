import Vue from 'vue'
import Vuex from 'vuex'
import TaskData from './TaskData/index'
import VuexPersistence from 'vuex-persist'
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const vuexLocal = new VuexPersistence({
  storage:{
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
})


export default new Vuex.Store({
  state: {
    loader: false
  },
  mutations: {
    commitLoader (state, data) {
      state.loader = data
    }
  },
  actions: {
    updateLoader (context, payload) {
      context.commit('commitLoader', payload)
    }
  },
  getters: {
    loader: state => state.loader
  },
  modules: {
    TaskData
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
})
