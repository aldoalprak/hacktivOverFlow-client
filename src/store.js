import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { log } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:"",
    email:"",
    currUserId:""
  },
  mutations: {
    SET_USER(state,payload) {
      state.username = payload.username,
      state.email = payload.email,
      state.currUserId = payload._id
    }
  },
  actions: {
    showUser({commit}) {
      axios({
        method:"get",
        url:"http://localhost:3000/users/showone",
        headers:{
          token:localStorage.getItem("token")
        }
      })
      .then(({data})=>{
        console.log("dt user===>",data);
        
        commit('SET_USER',data)
      })
      .catch(err=>{
        console.log(err.message);
        
      })
    }
  }
})
