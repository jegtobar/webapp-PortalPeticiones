<template>
  <v-row>
    <download-excel
      class="btn btn-default"
      :data="seguimientos"
      :fields="json_fields"
      worksheet="Lista de Vecinos"
      name="Lista de Vecinos.xls"
    >
      <v-sheet color="grey" class="px-3 pt-3 pb-3" v-if="!seguimientos">
        <v-skeleton-loader class="mx-auto" type="button"></v-skeleton-loader>
      </v-sheet>
      <v-btn
        elevation="2"
        align="right"
        justify="space-around"
        color="primary accent-4"
        title="Descargar Vecinos"
        v-if="seguimientos"
        >Vecinos
        <v-icon> mdi-download-circle-outline </v-icon>
      </v-btn>
    </download-excel>
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
    seguimientos: null,
    titulo: [],
    json_fields: {
      Id: "id",
      "Tipo de vecino": "seguimiento",
      "Primer Nombre": "pNombre",
      "Segundo Nombre": "sNombre",
      "Primer Apellido": "pApellido",
      "Segundo Apellido": "sApellido",
      "Fecha de Nacimiento": "nacimiento",
      Zona: "zona",
      Distrito: "distrito_id",
      Sector: "sector",
      Colonia: "colonia",
      Telefono: "telefono_casa",
      Celular: "celular",
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
                  "listas/vecinos/" +
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
                  "listas/vecinos/" +
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
        case 3:
          if (
            JSON.parse(localStorage.getItem("distrito")) === 1 ||
            JSON.parse(localStorage.getItem("distrito")) === 2 ||
            JSON.parse(localStorage.getItem("distrito")) === 3
          ) {
            axios
              .get(
                process.env.VUE_APP_SERVICE_URL +
                  "listas/vecinos/" +
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
                  "listas/vecinos/" +
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
            .get(process.env.VUE_APP_SERVICE_URL + "listas/vecinos")
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
