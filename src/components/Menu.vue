<template>
    <div>
        <v-list nav dense>
          <div v-for="(link, i) in links" :key="i">
            <v-list-item
                v-if="!link.subLinks"
                :to="link.to"
                class="v-list-item"
            >
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="link.text" />
            </v-list-item>

            <v-list-group
                v-else
                :key="link.text"
                no-action
                :prepend-icon="link.icon"
                :value="false"
            >
                <template v-slot:activator>
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </template>
                <template>
                    <div>
                        <v-list-item
                            v-for="sublink in link.subLinks"
                            :to="sublink.to"
                            :key="sublink.text"
                        >
                            <v-list-item-icon>
                            <v-icon>{{ sublink.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ sublink.text }}</v-list-item-title>
                        </v-list-item>
                    </div>
                </template>
            </v-list-group>
            </div>
        </v-list>
    </div>
</template>
<script>
import axios from 'axios'
export default {
      mounted(){
        this.getMenu();
    },
    data:()=>({
        links: []
    }),
    methods:{
        getMenu(){
        
        axios.get(process.env.VUE_APP_SERVICE_URL+'menu/'+JSON.parse(localStorage.getItem('user_id')))
                .then((response)=>{
                  this.links=response.data.menu
                  console.log(this.arreglo.menu)
                    
                })
                .catch(function(error){
                   console.log(error.response.data)
                })
      }
    }

}
</script>