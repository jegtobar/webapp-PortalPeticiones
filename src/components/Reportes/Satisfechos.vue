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
            worksheet="Seguimientos Satisfechos"
            name="Seguimientos Satisfechos.xls"
            >
                <v-btn
                elevation="2"
                color="success"
                title="Descargar seguimientos"
                >
                    <v-icon
                        dark
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
            "Fecha Creación":"created_at",
            "Primer Nombre": "pNombre",
            "Segundo Nombre": "sNombre",
            "Primer Apellido": "pApellido",
            "Segundo Apellido": "sApellido",
            "Zona":"zona",
            "Distrito":"distrito",
            "Sector":"sector",
            "Colonia":"colonia",
            "Fecha":"fecha",
            "Actividad":"actividad",
            "Descripcion":"descripcion",
            "Promotor Responsable":"responsable"
        },
    
    }),
     methods: {
        getSeguimientos(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'reporte/seguimientosatisfechos')
                .then((response)=>{
                    this.seguimientos=response.data.reportes;
                    this.titulo=response.data.titulo;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
        }
     }
}
</script>