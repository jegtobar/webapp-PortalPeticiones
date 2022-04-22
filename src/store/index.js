import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../main';


Vue.use(Vuex)

import dialog from './dialog'

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null,
  },
  getters:{
    //Para usar las variables globales

    //verificar si alguien está logeado

  },
  mutations: {

      //asignar valores a las variabels globales///commit
      loginStart: state => state.loggingIn = true,
      loginStop: (state, errorMessage) => {

      state.loggingIn = false;
      state.loginError = errorMessage;

    },
    updateAccessToken: (state, accessToken) => {

      state.accessToken = accessToken;

    },
    logout: (state) => {

      state.accessToken = null;
        
    }, 

  },
  actions: {
    //funciones globales
  
    doLogin({commit}, params){
      commit('loginStart')
      
        axios(
          {
            method: 'POST',
            url: process.env.VUE_APP_SERVICE_LOGIN,
            data: params
          }
        ).then(response=>{
          if(response.data.res===true){
            commit('loginStop', null);
            localStorage.setItem('usuario', JSON.stringify(response.data.data));
            localStorage.setItem('username', JSON.stringify(response.data.username));
            localStorage.setItem('rol', JSON.stringify(response.data.rol_id));
            localStorage.setItem('alcaldia', JSON.stringify(response.data.alcaldia_id));
            localStorage.setItem('distrito', JSON.stringify(response.data.distrito_id));
            localStorage.setItem('nombres', JSON.stringify(response.data.nombres));
            localStorage.setItem('apellidos', JSON.stringify(response.data.apellidos));
            localStorage.setItem('user_id', JSON.stringify(response.data.user_id));
            localStorage.setItem('avatar', JSON.stringify(response.data.avatar));
            localStorage.setItem('user_alcaldia', JSON.stringify(response.data.alcaldia));
            localStorage.setItem('user_rol', JSON.stringify(response.data.rol));
            router.push('/inicio')
          }else{
            alert('Datos incorrectos')
          }
          
        });
      
    },
    fetchAccessToken({ commit }) {

      commit('updateAccessToken', localStorage.getItem('usuario'));

  },
  logout({ commit }) {

    localStorage.removeItem('usuario');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
    localStorage.removeItem('alcaldia');
    localStorage.removeItem('distrito');
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('user_id');
    localStorage.removeItem('avatar');
    localStorage.removeItem('user_alcaldia');
    localStorage.removeItem('user_rol');
    commit('logout');
    router.push('/');
    
}
  },
  modules: {
    dialog: dialog
  }
})
