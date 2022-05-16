<template>
  <div>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Reporte Auditoría
      </v-card-title>
      <v-card-text>
        <embed :src="pdf_url" width="800" height="375" type="application/pdf" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="setShow(false)"> Cerrar </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    pdf_url: String,
  },
  methods: {
    ...mapMutations({
      setShow: "dialog/setShow",
    }),
    obtener_datos() {
      console.log("obtener datos");
    },
  },
  created() {
    this.obtener_datos();
  },
};
</script>
