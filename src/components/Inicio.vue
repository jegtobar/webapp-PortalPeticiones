<template>
  <v-container>
      <v-row>
        <v-col>
        <v-banner
        elevation="9"
        outlined
        rounded
        class="indigo darken-4 white--text"
    >
        <v-icon class="white">mdi-chart-areaspline</v-icon>
            Top 5: Estado 
        </v-banner>
        <v-spacer></v-spacer>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
            <v-banner
            elevation="9"
            outlined
            rounded
            class="indigo darken-4 white--text"
            >
            <v-icon class="white">mdi-chart-areaspline</v-icon>
               Mejores 5: Vecinos Satisfechos 
            </v-banner>
            <Satisfechos/>
          </v-col>
          <v-col>
            <v-banner
            elevation="9"
            outlined
            rounded
            class="indigo darken-4 white--text"
            >
            <v-icon class="white">mdi-chart-areaspline</v-icon>
               Últimos 5: Vecinos Satisfechos 
            </v-banner>
            <MntoSatisfechos/>
          </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
          <v-col>
            <v-banner
            elevation="9"
            outlined
            rounded
            class="indigo darken-4 white--text"
            >
            <v-icon class="white">mdi-chart-areaspline</v-icon>
               Mejores 5: Vecinos Muy Satisfechos
            </v-banner>
            <MuySatisfechos/>
          </v-col>
          <v-col>
            <v-banner
            elevation="9"
            outlined
            rounded
            class="indigo darken-4 white--text"
            >
            <v-icon class="white">mdi-chart-areaspline</v-icon>
              Últimos 5: Vecinos Muy Satisfechos
            </v-banner>
            <MntoMuySatisfechos/>
          </v-col>
      </v-row>
  </v-container>
</template>
<script>
import Satisfechos from './Top5/Satisfechos.vue'
import MntoSatisfechos from './Top5/MntoSatisfechos.vue'
import MuySatisfechos from './Top5/MuySatisfechos.vue'
import MntoMuySatisfechos from './Top5/MntoMuySatisfechos.vue'

  export default {
    data: () => ({
     
    }),
    components: {
        Satisfechos,
        MntoSatisfechos,
        MuySatisfechos,
        MntoMuySatisfechos
    }
  }
</script>