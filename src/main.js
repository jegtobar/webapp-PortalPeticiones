import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'


// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


//importamos nuestros componentes
import login from './components/Login'
import inicio from './components/Inicio'
import listaUsuarios from './components/Usuarios/ListaUsuarios'
import perfil from './components/Usuarios/Perfil'
import crearPeticion from './components/Peticiones/CrearPeticion'
import peticionVecino from './components/Peticiones/PeticionVecino'
import seguimientoPeticion from './components/Peticiones/SeguimientoPeticiones'
import seguimientoMuySatisfechos from './components/Personas/SeguimientoMuySatisfechos'
import seguimientoSatisfechos from './components/Personas/SeguimientoSatisfechos'
import creaVecino from './components/Personas/CrearPersonas'
import crearSeguimiento from './components/Personas/CrearSeguimientoPersonas'
import crearInsatisfecho from './components/Personas/SeguimientoInsatisfechos'

//Metas
import metasSatisfechos from './components/Metas/MetasSatisfechos'
import metasMuySatisfechos from './components/Metas/MetasMuySatisfechos'


//Auditoria
import auditoriaSatisfechos from './components/Auditoria/AuditoriaSatisfechos'
import auditoriaMuySatisfechos from './components/Auditoria/AuditoriaMuySatisfechos'
import audiSatisfechos from './components/Auditoria/PorAlcaldia/Satisfechos'
import audiMuySatisfechos from './components/Auditoria/PorAlcaldia/MuySatisfechos'

//Dashboard
import dashboard from './components/Dashboard/DashboardSatisfechos'
import dashboardMuySatisfechos from './components/Dashboard/DashboardMuySatisfechos'
import dashboardSatisfechosByAlcaldia from './components/Dashboard/DashMntoSatisfechosByAlcaldia'
import dashboardMuySatisfechosByAlcaldia from './components/Dashboard/DashMntoMuySatisfechosByAlcaldia'
// import dashboard from './components/Dashboard'


//creamos nuestros componentes

//Usuario
Vue.component('inicio', inicio);
Vue.component('usuarios', listaUsuarios);
Vue.component('perfil', perfil);


//Personas

Vue.component('muysatisfechos',seguimientoMuySatisfechos)
Vue.component('satisfechos',seguimientoSatisfechos)
Vue.component('creaVecino', creaVecino)
Vue.component('crearSeguimiento', crearSeguimiento)
Vue.component('crearInsatisfecho', crearInsatisfecho)

//Metas
Vue.component('metasSatisfechos',metasSatisfechos)
Vue.component('metasMuySatisfechos',metasSatisfechos)


//Peticiones
Vue.component('crearPeticion', crearPeticion);
Vue.component('peticionVecino', peticionVecino);
Vue.component('seguimiento',seguimientoPeticion);

//Dashboard
Vue.component('dashboard', dashboard);
Vue.component('dashboardMuySatisfechos', dashboardMuySatisfechos);
Vue.component('dashboardSatisfechosByAlcaldia', dashboardSatisfechosByAlcaldia);
Vue.component('dashboardMuySatisfechosByAlcaldia', dashboardMuySatisfechosByAlcaldia);

//Auditoria
Vue.component('auditoriaSatisfechos', auditoriaSatisfechos);
Vue.component('auditoriaMuySatisfechos', auditoriaMuySatisfechos);
Vue.component('audiSatisfechos', audiSatisfechos);
Vue.component('audiMuySatisfechos', audiMuySatisfechos);

//Uso de vue-router

Vue.use(VueRouter);
Vue.use(VueSweetalert2)
Vue.use(HighchartsVue)


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
  {path:'/usuarios', component:listaUsuarios},
  {path:'/perfil', component:perfil},
  {path:'/nuevoVecino', component:creaVecino},
  {path:'/insatisfecho', component:crearInsatisfecho},
  {path:'/ingresarSeguimiento', component:crearSeguimiento},
  {path:'/muysatisfechos', component:seguimientoMuySatisfechos},
  {path:'/satisfechos', component:seguimientoSatisfechos},
  {path:'/peticion', component:crearPeticion},
  {path:'/peticion-vecino', component:peticionVecino},
  {path:'/seguimiento', component:seguimientoPeticion},
  {path:'/metasSatisfechos', component:metasSatisfechos},
  {path:'/metasMuySatisfechos', component:metasMuySatisfechos},
  {path:'/auditoriaSatisfechos', component:auditoriaSatisfechos},
  {path:'/auditoriaMuySatisfechos', component:auditoriaMuySatisfechos},
  {path:'/audiSatisfechos', component:audiSatisfechos},
  {path:'/audiMuySatisfechos', component:audiMuySatisfechos},
  {path:'/dashboard', component:dashboard},
  {path:'/dashboardMuySatisfechos', component:dashboardMuySatisfechos},
  {path:'/indicadoresSatisfechos', component:dashboardSatisfechosByAlcaldia},
  {path:'/indicadoresMuySatisfechos', component:dashboardMuySatisfechosByAlcaldia},

]

//creacion objeto router

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  const data = {
    "url":to.path,
    "rol":JSON.parse(localStorage.getItem('rol'))
  }
  
  if (to.name != 'login') {
        
    if (store.state.accessToken == null) {
        return next('/');
    }else{
      axios.post(process.env.VUE_APP_SERVICE_URL+'rutas', data)
      .then((response)=>{
        if(response.data.length<=0){
          return next('/inicio')
        }
      })
      .catch(function(error){
      console.log(error.response.data)
      })
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

