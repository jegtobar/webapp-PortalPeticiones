<template>
    <v-row>
        <v-col
        cols="12"
        sm="6"
        md="4"
        >
            <download-excel
            class="btn btn-default"
            :data="seguimientos"
            :fields="json_fields"
            worksheet="Manteninmiento Vecinos Satisfechos"
            name="Mantenimiento Vecinos Satisfechos sin seguimientos.xls"
            >
                <v-btn
                elevation="2"
                color="red accent-4"
                title="Descargar Vecinos Sin Seguimientos"
                >
                    <v-icon
                        
                    >
                        mdi-download-circle-outline
                    </v-icon>
                </v-btn>
            </download-excel>
        </v-col>
    </v-row>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

export default {
    mounted(){
        this.getSeguimientos()
    },
    data: () => ({

        seguimientos:[],
        titulo:[],
        json_fields: {
            "Primer Nombre": "pNombre",
            "Segundo Nombre": "sNombre",
            "Primer Apellido": "pApellido",
            "Segundo Apellido": "sApellido",
            "Fecha de Nacimiento":"nacimiento",
            "Zona":"zona",
            "Distrito":"distrito_id",
            "Sector":"sector",
            "Colonia":"colonia",
            "Telefono":"telefono_casa",
            "Celular":"celular"
        },
    
    }),
     methods: {
        getSeguimientos(){
            switch (JSON.parse(localStorage.getItem('rol'))) {
                case 1:
                  if (JSON.parse(localStorage.getItem('distrito'))===1||JSON.parse(localStorage.getItem('distrito'))===2||JSON.parse(localStorage.getItem('distrito'))===3){
                        axios.get(process.env.VUE_APP_SERVICE_URL+'reporte/sinseguimientomntosatisfechos/'+JSON.parse(localStorage.getItem('alcaldia'))+'/'+JSON.parse(localStorage.getItem('distrito')))
                        .then((response)=>{
                            this.seguimientos=response.data.reportes;
                            this.titulo=response.data.titulo;
                        })
                        .catch(function(error){
                        console.log(error.response.data);
                        })
                  }else{
                       axios.get(process.env.VUE_APP_SERVICE_URL+'reporte/sinseguimientomntosatisfechos/'+JSON.parse(localStorage.getItem('alcaldia')))
                        .then((response)=>{
                            this.seguimientos=response.data.reportes;
                            this.titulo=response.data.titulo;
                        })
                        .catch(function(error){
                        console.log(error.response.data);
                        })
                  }
                    
                    break;
                case 4:
                    axios.get(process.env.VUE_APP_SERVICE_URL+'reporte/sinseguimientomntosatisfechos')
                    .then((response)=>{
                        this.seguimientos=response.data.reportes;
                        this.titulo=response.data.titulo;
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    })
                    break;
            
                default:
                    break;
            }
        }
     }
}
</script>