import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


//importamos nuestros componentes
import login from './components/Login'
import inicio from './components/Inicio'
import listaUsuarios from './components/Usuarios/ListaUsuarios'
import listaPersonas from './components/Personas/ListaPersonas'
import crearPeticion from './components/Peticiones/CrearPeticion'
import peticionVecino from './components/Peticiones/PeticionVecino'
import seguimientoPeticion from './components/Peticiones/SeguimientoPeticiones'
import seguimientoMuySatisfechos from './components/Personas/SeguimientoMuySatisfechos'
import seguimientoSatisfechos from './components/Personas/SeguimientoSatisfechos'
import metas from './components/Personas/Metas'
// import dashboard from './components/Dashboard'


//creamos nuestros componentes

//Usuario
Vue.component('inicio', inicio);
Vue.component('usuarios', listaUsuarios);


//Personas
Vue.component('personas', listaPersonas);
Vue.component('muysatisfechos',seguimientoMuySatisfechos)
Vue.component('satisfechos',seguimientoSatisfechos)
Vue.component('metas',metas)

//Peticiones
Vue.component('crearPeticion', crearPeticion);
Vue.component('peticionVecino', peticionVecino);
Vue.component('seguimiento',seguimientoPeticion);

// Vue.component('dashboard', dashboard);

//Uso de vue-router

Vue.use(VueRouter);
Vue.use(VueSweetalert2);

//Definición de rutas

const routes=[
  {path:'/', 
  name:'login',
  component:login,
  meta: {
    hideNavbar: true,
   }

  },
  {path:'/inicio', component:inicio},
  // {path:'/dashboard', component:inicio},
  {path:'/usuarios', component:listaUsuarios},
  {path:'/personas', component:listaPersonas},
  {path:'/muysatisfechos', component:seguimientoMuySatisfechos},
  {path:'/satisfechos', component:seguimientoSatisfechos},
  {path:'/peticion', component:crearPeticion},
  {path:'/peticion-vecino', component:peticionVecino},
  {path:'/seguimiento', component:seguimientoPeticion},
  {path:'/metas', component:metas},

]

//creacion objeto router

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
    
  store.dispatch('fetchAccessToken');

  if (to.name != 'login') {
        
    if (store.state.accessToken == null) {
        return next('/');
    }

}

  if (to.name == 'login') {

      if (store.state.accessToken != null) {
          
          return next('/inicio');
      }

  }


  next();

});

export default router


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

