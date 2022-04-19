<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%" >
      <v-system-bar app color="#97d700" v-if="!$route.meta.hideNavbar">
         <v-spacer></v-spacer>
        
      </v-system-bar>
        <v-app-bar app color="#10069f" class=" accent-4 white--text" v-if="!$route.meta.hideNavbar">
          <v-toolbar-title>
              <v-list-item :to="{path:'/inicio'}">
                <v-img
                  alt="Muni-logo"
                  class="shrink mr-2"
                  contain
                  src="../src/assets/img/logo1.png"
                  transition="scale-transition"
                  width="40"
                  :to="{path:'/'}"       
                />
                <h4 class="white--text">Sistema para evaluación del desempeño laboral |&nbsp;</h4>
                <h5 class="white--text">Mediante la medición de satisfacción del vecino a través de los servicios prestados</h5>
                <!-- <v-btn @click="logout">Salir</v-btn> -->
            </v-list-item>
          </v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
          app
          clipped
          fixed
          permanent
          mini-variant
          expand-on-hover
          v-if="!$route.meta.hideNavbar"
          >
          <v-list>
            
            <Avatar/>
          </v-list>

          <v-divider></v-divider>
            <Menu/>
        
        <v-list nav dense>
            <v-list-item
            @click="logout()"
            link>
                  <v-icon>
                    mdi-logout
                  </v-icon>
                  <v-list-item-title
                  >Salir</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>   
    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
            <router-view/>
        </v-fade-transition>
      </v-container>
    </v-main>
    </v-card>
  </v-app>
</template>


<script>

import { mapActions } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import Menu from '@/components/Menu.vue'
// import axios from 'axios'

export default{
  name:'App',
 

  data: ()=>({
       nombres: JSON.parse(localStorage.getItem('nombres')),
       apellidos: JSON.parse(localStorage.getItem('apellidos')),
       z: JSON.parse(localStorage.getItem('zona')),
       r: JSON.parse(localStorage.getItem('rolUsuario')),
      
    arreglo:[],
  }),
  methods:{

     ...mapActions([
        'logout'
      ]),




  },
  components :{
    Avatar,
    Menu
  }
  
}; 

</script>
<style scoped>
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding: 0 8px;
}
</style>
