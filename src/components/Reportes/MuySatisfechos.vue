<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <download-excel
        class="btn btn-default"
        :data="seguimientos"
        :fields="json_fields"
        worksheet="Seguimientos Muy Satisfechos"
        name="Seguimientos Vecinos Muy Satisfechos.xls"
      >
        <v-btn elevation="2" color="success" title="Descargar seguimientos">
          <v-icon dark> mdi-download-circle-outline </v-icon>
        </v-btn>
      </download-excel>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

export default {
  mounted() {
    this.getSeguimientos();
  },
  data: () => ({
    seguimientos: [],
    titulo: [],
    json_fields: {
      "Fecha Creación": "created_at",
      "Primer Nombre": "pNombre",
      "Segundo Nombre": "sNombre",
      "Primer Apellido": "pApellido",
      "Segundo Apellido": "sApellido",
      "Teléfono":"celular",
      Zona: "zona",
      Distrito: "distrito",
      Sector: "sector",
      Colonia: "colonia",
      Fecha: "fecha",
      Actividad: "actividad",
      Descripcion: "descripcion",
      "Promotor Responsable": "responsable",
    },
  }),
  methods: {
    getSeguimientos() {
      switch (JSON.parse(localStorage.getItem("rol"))) {
        case 1:
          if (
            JSON.parse(localStorage.getItem("distrito")) === 1 ||
            JSON.parse(localStorage.getItem("distrito")) === 2 ||
            JSON.parse(localStorage.getItem("distrito")) === 3
          ) {
            axios
              .get(
                process.env.VUE_APP_SERVICE_URL +
                  "reporte/seguimientomuysatisfechos/" +
                  JSON.parse(localStorage.getItem("alcaldia")) +
                  "/" +
                  JSON.parse(localStorage.getItem("distrito"))
              )
              .then((response) => {
                this.seguimientos = response.data.reportes;
                this.titulo = response.data.titulo;
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          } else {
            axios
              .get(
                process.env.VUE_APP_SERVICE_URL +
                  "reporte/seguimientomuysatisfechos/" +
                  JSON.parse(localStorage.getItem("alcaldia"))
              )
              .then((response) => {
                this.seguimientos = response.data.reportes;
                this.titulo = response.data.titulo;
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          }

          break;
        case 4:
          axios
            .get(
              process.env.VUE_APP_SERVICE_URL +
                "reporte/seguimientomuysatisfechos"
            )
            .then((response) => {
              this.seguimientos = response.data.reportes;
              this.titulo = response.data.titulo;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        default:
          break;
      }
    },
  },
};
</script>
