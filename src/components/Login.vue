<template>
  <v-container>
    <v-app>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-text class="mt-15">
                  <h4 class="text-center">Inicio de Sesión</h4>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="8">
                      <v-form
                        @submit.prevent="login"
                        ref="formValidate"
                        v-model="validate"
                      >
                        <v-text-field
                          v-model="user.username"
                          label="Usuario"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          :rules="nameRules"
                        />
                        <v-text-field
                          v-model="user.password"
                          label="Contraseña"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          :type="showPassword ? 'text' : 'password'"
                          :rules="passwordRules"
                          :append-icon="
                            showPassword ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="showPassword = !showPassword"
                        />
                        <v-row>
                          <v-col cols="12" sm="5"> </v-col>
                        </v-row>
                        <v-btn type="submit" color="blue" dark block tile
                          >Ingresar</v-btn
                        >
                      </v-form>

                      <div
                        class="d-flex justify-space-between align-center mx-10 mb-16"
                      ></div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" class="light-blue darken-4 rounded-bl-xl">
                <div
                  style="text-align: center; padding: 180px 0"
                  class="d-flex flex-column justify-space-between align-center"
                >
                  <v-img
                    alt="Muni-logo"
                    src="../assets/img/logo1.png"
                    transition="scale-transition"
                    width="100"
                  />
                  <v-card-text class="white--text">
                    <h1 class="text-center">
                      Sistema para evaluación del <br />
                      desempeño laboral
                    </h1>
                    <br />
                    <h3 class="white--text">
                      Mediante la medición de la satisfacción a través de los
                      servicios prestados.
                    </h3>
                  </v-card-text>
                  <div class="text-center">
                    <!-- <v-btn tile outlined dark @click="step++">SIGN UP</v-btn> -->
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "login",
  data: () => ({
    validate: true,
    showPassword: false,
    user: {},
    showPass: false,
    nameRules: [(v) => !!v || "Usuario es requerido"],
    passwordRules: [(v) => !!v || "Contraseña es requerida"],
  }),
  methods: {
    ...mapActions(["doLogin"]),
    login() {
      this.$refs.formValidate.validate();
      if (this.validate) {
        this.doLogin(this.user);
      }
    },
  },
  computed: {
    ...mapState(["loggingIn", "loginError", "loginError"]),
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
