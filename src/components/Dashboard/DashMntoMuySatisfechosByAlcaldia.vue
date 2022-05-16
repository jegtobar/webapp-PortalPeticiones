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
        <br />
        <v-row align="center" justify="space-around">
          <v-btn
            v-if="userData.alcaldia == '2' || userData.alcaldia == '3'"
            @click="getMetasSatisfechosAlcaldias()"
          >
            Alcaldia
          </v-btn>
          <v-btn
            v-if="userData.alcaldia == '1' || userData.alcaldia == '4'"
            @click="getMetaByDistritoAlcaldia()"
          >
            Alcaldia
          </v-btn>
          <v-btn
            align="center"
            justify="space-around"
            v-if="userData.alcaldia == '1' || userData.alcaldia == '4'"
            @click="getMetasColoniasByDistritos()"
          >
            Estado Colonias
          </v-btn>
          <v-btn
            align="center"
            justify="space-around"
            v-if="userData.alcaldia == '2' || userData.alcaldia == '3'"
            @click="getColonias()"
          >
            Estado Colonias
          </v-btn>
          <v-btn
            align="center"
            justify="space-around"
            v-if="userData.alcaldia == '3'"
            @click="getMetasGlobalesBySector()"
          >
            Estado Sectores
          </v-btn>
        </v-row>
      </v-col>
      <v-col>
        <v-select
          v-model="sector.sector"
          :items="sector"
          item-text="sector"
          item-value="id"
          label="Sector"
          outlined
          color="#10069f"
          @change="getMetasBySector()"
          v-if="userData.alcaldia == '3'"
        ></v-select>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(colonia, key) in arreglo" :key="key">
        <v-card class="mx-auto" max-width="344" elevation="13" outlined>
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
import axios from "axios";
hcMore(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },
  methods: {
    //Meta global de cada alcaldia auxiliar
    getMetasSatisfechosAlcaldias() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuysatisfechos/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    //Metas de las colonias segun distrito seleccionado
    getMetasColoniasByDistritos() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuysatisfechos/" +
            this.userData.alcaldia +
            "/" +
            this.userData.distrito
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    //Para alcaldes auxiliares zona 1 y 21
    getMetaByDistritoAlcaldia() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuydistritoAlcaldia/" +
            this.userData.alcaldia +
            "/" +
            this.userData.distrito
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getDistritos() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/distritos/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.distrito = response.data.distritos;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    //Meta colonias segun alcaldia
    getColonias() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuyalcaldia/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    getSector() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/sectores/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.sector = response.data.sectores;
          // console.log(this.sector);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    //Meta global segun distritos
    getMetasByDistrito() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuydistrito/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    //Meta de las colonias por sector
    getMetasBySector() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuyporsector/" +
            this.sector.sector
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getMetasGlobalesBySector() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "dashboard/mntomuymetaporsector/" +
            this.userData.alcaldia
        )
        .then((response) => {
          this.arreglo = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getMetas() {
      switch (this.userData.alcaldia) {
        case 1:
          this.getMetaByDistritoAlcaldia();
          this.getDistritos();
          break;
        case 2:
          this.getMetasSatisfechosAlcaldias();

          break;
        case 3:
          this.getSector();
          this.getMetasSatisfechosAlcaldias();
          break;
        case 4:
          this.getMetaByDistritoAlcaldia();
          this.getDistritos();
          break;
      }
    },
  },
  data() {
    return {
      arreglo: [],
      alcaldias: [],
      distrito: [],
      sector: [],
    };
  },
  mounted() {
    this.getMetas();
  },
  computed: {
    userData: function () {
      let data = {
        alcaldia: JSON.parse(localStorage.getItem("alcaldia")),
        distrito: JSON.parse(localStorage.getItem("distrito")),
      };
      return data;
    },
  },
};
</script>
