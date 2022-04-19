<template>
  <v-container>
    <v-row>
      <v-col class="mb-4">
        <v-banner
        elevation="9"
        outlined
        rounded
        class="indigo darken-4 white--text"
        >
        <v-icon class="white">mdi-view-dashboard</v-icon>
                  Dashboard Mantenimiento Vecinos Muy Satisfechos
        </v-banner>  
        <br>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-btn
          @click="getMetasSatisfechosAlcaldias()"
          >
            Todas las Alcaldias
          </v-btn>
          
          <v-btn        
          align="center"
          justify="space-around"
          v-if="alcaldias.alcaldia_id=='1'||alcaldias.alcaldia_id=='4'"
          @click="getMetasByDistrito(), getDistritos()"
        >
          Estado Distritos
        </v-btn>
         <v-btn
                    
          align="center"
          justify="space-around"
          @click="getMetaRegion()"
        >
          Estado Región 1
        </v-btn>
        <v-btn
          
          align="center"
          justify="space-around"
          v-if="alcaldias.alcaldia_id=='3'"
          @click="getMetasGlobalesBySector()"
        >
          Estado Sectores
        </v-btn>
        </v-row>                            
      </v-col>
      <v-col>
        <v-select
          v-model="alcaldias.alcaldia_id"
          :items="alcaldias"
          item-text="alcaldia"
          item-value='id'
          label="Seleccione alcaldia"
          outlined
          color="#10069f"
          @change="getMetas()"
          >   
        </v-select>
          <v-select
          v-model="distrito.distrito_id"
          :items="distrito"
          item-text="distrito"
          item-value='distrito_id'
          label="Seleccione Distrito"
          outlined
          color="#10069f"
          v-if="alcaldias.alcaldia_id=='1'||alcaldias.alcaldia_id=='4'"
          @change="getMetasColoniasByDistritos()"
          ></v-select>

          <v-select 
            v-model="sector.sector"
            :items="sector"
            item-text="sector"
            item-value='id'
            label="Sector"
            outlined
            color="#10069f"
            @change="getMetasBySector()"
            v-if="alcaldias.alcaldia_id=='3'"
          ></v-select>
        <v-divider></v-divider>
            
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(colonia, key) in arreglo" :key="key">
        <v-card
            class="mx-auto"
            max-width="344"
            elevation="13"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  <highcharts :options="colonia.chart"></highcharts>
                </div>
              </v-list-item-content>  
            </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import hcMore from "highcharts/highcharts-more";
import axios from 'axios';
hcMore(Highcharts);

export default {

  
  components: {
    highcharts: Chart
  },
  methods: {
    //Meta general Region 1
      getMetaRegion(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuymetaregion')
              .then((response)=>{
                  this.arreglo = response.data
              })         
              .catch(function(error){
              console.log(error.response.data)
              })
    },

    //Meta global de cada alcaldia auxiliar
    getMetasSatisfechosAlcaldias(){
      axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuysatisfechos')
            .then((response)=>{
                this.arreglo = response.data
            })         
            .catch(function(error){
            console.log(error.response.data)
            })

    },
    //Metas de las colonias segun distrito seleccionado
    getMetasColoniasByDistritos(){
      console.log(this.distrito.distrito_id)
      axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuysatisfechos/'+this.alcaldias.alcaldia_id + '/' + this.distrito.distrito_id)
            .then((response)=>{
                this.arreglo = response.data
            })         
            .catch(function(error){
            console.log(error.response.data)
            })

    },
    getDistritos(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/distritos/'+this.alcaldias.alcaldia_id)
                .then((response)=>{
                        this.distrito=response.data.distritos;
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    })
        },
    getAlcaldias(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/alcaldias')
                .then((response)=>{
                    this.alcaldias=response.data.alcaldias;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
      },
      //Meta colonias segun alcaldia
    getColonias(){
          axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuyalcaldia/'+ this.alcaldias.alcaldia_id)
              .then((response)=>{
                  this.arreglo = response.data
              })
              .catch(function(error){
                  console.log(error.response.data);
              })
    },
    getSector(){

          axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/sectores/'+this.alcaldias.alcaldia_id)
              .then((response)=>{
                      this.sector=response.data.sectores;
                      // console.log(this.sector);
                  })
                  .catch(function(error){
                  console.log(error.response.data);
                  })
      },
      //Meta global segun distritos
    getMetasByDistrito(){
      axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuydistrito/'+ this.alcaldias.alcaldia_id)
              .then((response)=>{
                  this.arreglo = response.data
              })
              .catch(function(error){
                  console.log(error.response.data);
              })
    },
    //Meta de las colonias por sector
    getMetasBySector(){
      axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuyporsector/'+ this.sector.sector)
              .then((response)=>{
                  this.arreglo = response.data
              })
              .catch(function(error){
                  console.log(error.response.data);
              })
    },
    
    getMetasGlobalesBySector(){
              axios.get(process.env.VUE_APP_SERVICE_URL+'dashboard/mntomuymetaporsector/'+ this.alcaldias.alcaldia_id)
              .then((response)=>{
                  this.arreglo = response.data
              })
              .catch(function(error){
                  console.log(error.response.data);
              })
    },

    getMetas(){
      switch (this.alcaldias.alcaldia_id) {
        case 1:
          this.getMetasByDistrito()
          this.getDistritos()
          break;
        case 2:
          this.getColonias()
          break;
        case 3:
          this.getSector()
          this.getMetasGlobalesBySector()
          break;
        case 4:
          this.getMetasByDistrito()
          this.getDistritos()
          break;
      
      }
    }

      

  },
  data() {
    return {
      arreglo:[],
      alcaldias:[],
      distrito:[],
      sector:[],
    };
  }, 
  mounted(){
    this.getMetaRegion(),
    this.getAlcaldias()
  }
};
</script>
