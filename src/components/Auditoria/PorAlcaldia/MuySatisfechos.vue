<template>
  <v-container>
    <template>
      <v-row>
        <v-col class="mb-4">
          <h1 class="display-1 text-left font-weight-bold mb-3">
            Auditoría: Mantenimiento Peticiones Vecinos Muy Satisfechos
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2 justify-center">
            Reporte Auditoría
          </v-card-title>
          <v-card-text class="justify-center">
            <embed
              :src="pdf_url"
              width="1000"
              height="575"
              type="application/pdf"
            />
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    this.obtener_datos();
  },

  data: () => ({
    pdf_url: "",
    step: 1,
    editedIndex: -1,
  }),

  methods: {
    obtener_datos() {
     if (
        JSON.parse(localStorage.getItem("distrito")) === 1 ||
        JSON.parse(localStorage.getItem("distrito")) === 2 ||
        JSON.parse(localStorage.getItem("distrito")) === 3
      ) {
        axios
          .get(
            process.env.VUE_APP_SERVICE_URL +
              "reporte/auditoria/mntomuysatisfechos/" +
              JSON.parse(
                localStorage.getItem("alcaldia")) +
                  "/" +
                  JSON.parse(localStorage.getItem("distrito"))
              
          )
          .then((response) => {
            this.pdf_url = response.data.url_pdf;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      } else {
        axios
          .get(
            process.env.VUE_APP_SERVICE_URL +
              "reporte/mntomuysatisfechos/" +
              JSON.parse(localStorage.getItem("alcaldia"))
          )
          .then((response) => {
            this.pdf_url = response.data.url_pdf;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
  },
};
</script>
