<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>

          </th>
          <th class="text-left">
            Promotor
          </th>
          <th class="text-left">
            Colonia
          </th>
          <th>
            <v-icon>mdi-account-check-outline</v-icon>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in arreglo"
          :key="item.responsable"
        >
          <td><v-avatar>
            <img
              :src="item.avatar"
            >
          </v-avatar></td>
          <td>{{ item.responsable }}</td>
          <td>{{ item.colonia }}</td>
          <td><v-icon>mdi-emoticon-sad-outline</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import axios from 'axios';
  export default {
    mounted(){
        this.getSatisfechos();
    },
    data () {
      return {
        arreglo:[]
      }
    },
    methods:{
      getSatisfechos(){
        axios.get(process.env.VUE_APP_SERVICE_URL+'tablero/mntosatisfechos')
                .then((response)=>{
                    this.arreglo=response.data
                    
                })
                .catch(function(error){
                   console.log(error.response.data)
                })
      }
    }
  }
</script>