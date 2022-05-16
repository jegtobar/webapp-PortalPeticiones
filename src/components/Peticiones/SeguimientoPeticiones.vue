<template>
  <v-container>
    <template>
      <v-row>
        <v-col class="mb-4">
          <h1 class="display-1 text-left font-weight-bold mb-3">
            Seguimiento Peticiones
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mb-4">
          <v-form ref="form" v-model="valid" @submit.prevent="buscarPeticion">
            <v-text-field
              label="Número de petición "
              v-model="seguimiento.gestion_id"
              :rules="Rules"
            >
            </v-text-field>
            <v-card-actions>
              <v-btn color="primary" class="mr-4" type="submit">Buscar</v-btn>
            </v-card-actions>
            <br />
          </v-form>

          <v-divider></v-divider>
          <br />
          <v-select
            v-model="gestion.estatus"
            :items="['En proceso', 'Finalizado']"
            label="Cambiar estatus de la gestión"
            outlined
            color="#10069f"
            @change="cambiarEstatus()"
          ></v-select>
        </v-col>
        <v-col class="mb-4">
          <v-col>
            <v-banner
              elevation="9"
              outlined
              rounded
              class="indigo darken-4 white--text"
            >
              <v-icon class="white">mdi-book-open-outline</v-icon>
              Información de la petición
            </v-banner>
            <v-spacer></v-spacer>
            <v-card class="mx-auto" max-width="auto" outlined elevation="9">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    Vecino: {{ peticion.nombres }} {{ peticion.apellidos }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    ><strong>Dirección: </strong>{{ peticion.direccion }}
                    {{ peticion.zona }}
                    {{ peticion.colonia }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Descripción: </strong
                    >{{ peticion.descripcion }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Fecha de solicitud: </strong
                    >{{ peticion.fecha }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Estatus:</strong
                    >{{ peticion.estatus }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Oficio: </strong
                    >{{ peticion.oficio }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Promotor responsable: </strong
                    >{{ peticion.promotor }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <!-- <v-list-item-avatar
                           tile
                           size="80"
                           color="grey"
                      ></v-list-item-avatar> -->
              </v-list-item>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
      <v-banner
        elevation="9"
        outlined
        rounded
        class="indigo darken-4 white--text"
      >
        <v-icon class="white">mdi-notebook-edit</v-icon>
        Detalle seguimiento
      </v-banner>

      <br />
      <form v-on:submit.prevent="guardarSeguimiento()">
        <v-row>
          <v-col>
            <v-text-field
              v-model="seguimiento.fecha"
              label="Fecha"
              type="date"
              day-format
              outlined
              required
              color="#10069f"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-select
              v-model="seguimiento.actividad_id"
              :items="actividades"
              item-text="actividad"
              item-value="id"
              label="Actividad"
              outlined
              color="#10069f"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-textarea
            v-model="seguimiento.descripcion"
            label="Descripcion"
            outlined
            required
            color="#10069f"
          ></v-textarea>
        </v-row>
        <v-card-actions>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="indigo darken-4"
            type="submit"
            title="Guardar"
          >
            <v-icon dark> mdi-content-save-all-outline </v-icon>
          </v-btn>
        </v-card-actions>
      </form>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getCatalogoActividades();
  },

  data: () => ({
    seguimiento: {
      gestion_id: "",
      actividad_id: "",
      descripcion: "",
      fecha: "",
      usuario_id: "",
    },
    peticion: [],
    gestion: {
      estatus: "",
    },
    actividades: [],
    valid: true,
    Rules: [(v) => !!v || "Campo requerido"],
  }),

  methods: {
    buscarPeticion() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .get(
            process.env.VUE_APP_SERVICE_URL +
              "gestion/gestiones/" +
              this.seguimiento.gestion_id
          )
          .then((response) => {
            this.peticion = response.data.gestion;
            this.seguimiento.usuario_id = this.peticion.usuario_id;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
    getCatalogoActividades() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/actividades")
        .then((response) => {
          this.actividades = response.data.actividades;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    guardarSeguimiento() {
      axios
        .post(
          process.env.VUE_APP_SERVICE_URL + "gestion/seguimiento/create",
          this.seguimiento
        )
        .then(
          this.$swal({
            title: "Actividad registrada con éxito",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              this.limpiar();
            }
          })
        )
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    cambiarEstatus() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$swal({
          title: "¿Está seguro de cambiar el estatus?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .put(
                process.env.VUE_APP_SERVICE_URL +
                  "gestion/gestiones/" +
                  this.seguimiento.gestion_id,
                this.gestion
              )
              .then(() => {
                this.getPersonas();
                this.$swal("Guardado", "", "success");
                this.dialogSeguimiento = false;
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          } else if (result.isDenied) {
            this.$swal("Cambios no guardados");
          }
        });
      }
    },
    limpiar() {
      (this.peticion = {
        fecha: "",
        actividad: "",
        descripcion: "",
      }),
        (this.seguimiento = {
          gestion_id: "",
          actividad_id: "",
          descripcion: "",
          fecha: "",
          usuario_id: "",
        });
    },
  },
};
</script>
