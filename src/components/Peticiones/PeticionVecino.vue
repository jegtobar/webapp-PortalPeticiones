<template>
  <v-container>
    <template>
      <v-row>
        <v-col class="mb-4">
          <h1 class="display-1 text-left font-weight-bold mb-3">
            Peticiones por Vecino
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mb-4">
          <v-text-field
            label="Ingrese DPI del Vecino o número de celular"
            v-model="persona.dpi"
          >
          </v-text-field>
          <v-card-actions>
            <v-btn
              color="primary"
              class="mr-4"
              @click="buscarVecino(), buscarPeticionesVecino()"
              >Buscar</v-btn
            >
          </v-card-actions>
        </v-col>
        <v-col class="mb-4">
          <v-col>
            <v-banner
              elevation="9"
              outlined
              rounded
              class="indigo darken-4 white--text"
            >
              <v-icon class="white">mdi-account</v-icon>
              Información del Vecino
            </v-banner>
            <v-spacer></v-spacer>
            <v-card class="mx-auto" max-width="auto" outlined elevation="9">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    Vecino: {{ vecino.nombre }} {{ vecino.apellido }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    ><strong>DPI:</strong>
                    {{ vecino.dpi }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Dirección:</strong
                    >{{ vecino.direccion }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Teléfono:</strong>
                    {{ vecino.celular }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    ><strong>Liderazgo:</strong>
                    {{ vecino.liderazgo }}</v-list-item-subtitle
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

      <v-data-table
        :headers="headers"
        :items="peticiones"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de peticiones</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>

            <!-- Modal detalle de peticiones -->
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-card-title>
                  <v-toolbar dark color="#10069f">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title
                      ><span class="text-h5">{{
                        formTitle
                      }}</span></v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Cerrar
            </v-btn>
          </v-toolbar-items> -->
                  </v-toolbar>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-list-item-content>
                      <v-list-item-title
                        >Descripción de la petición:</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        editedItem.descripcion
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <!-- <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripción"
                      disabled
                    ></v-textarea> -->
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.dependencia"
                          label="Dependencia"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.peticion"
                          label="Petición de tipo"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.estatus"
                          label="Estatus"
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>

                    <v-list-item-content>
                      <v-list-item-title
                        >Historial seguimiento de la petición</v-list-item-title
                      >
                    </v-list-item-content>
                    <template>
                      <v-data-table
                        :headers="headersActividad"
                        :items="seguimiento"
                        :items-per-page="5"
                        class="elevation-1"
                      ></v-data-table>
                    </template>
                  </v-container>
                </v-card-text>

                <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="editarUsuario"
              >
                Guardar
              </v-btn>
            </v-card-actions> -->
              </v-card>
            </v-dialog>
            <!-- Fin Modal detalle de peticiones -->

            <!-- Modal eliminar gestion (deshabilitar) -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Fin Modal eliminar gestion (deshabilitar) -->
          </v-toolbar>
        </template>

        <!-- Acciones Editar-Eliminar -->
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item), buscarGestionSeguimiento()"
            title="Ver detalle"
          >
            mdi-book-check
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  mounted() {},

  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "No. Petición",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Fecha solicitud", value: "fecha" },
      { text: "Dependencia", value: "dependencia" },
      { text: "Petición de tipo", value: "peticion" },
      { text: "Promotor responsable", value: "promotor" },
      { text: "Estatus", value: "estatus" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    headersActividad: [
      {
        text: "Fecha",
        align: "start",
        sortable: false,
        value: "fecha",
      },
      { text: "Actividad", value: "actividad" },
      { text: "Descripción", value: "descripcion" },
      // { text: 'Petición de tipo', value: 'peticion' },
      { text: "Promotor responsable", value: "promotor" },
    ],
    //Array que muestra los datos en tabla
    peticiones: [
      {
        id: "",
        descripcion: "",
        dependencia: "",
        peticion: "",
        estatus: "",
        promotor: "",
        fecha: "",
      },
    ],
    vecino: [],
    persona: [],
    seguimiento: [
      {
        fecha: "",
        actividad: "",
        descripcion: "",
        promotor: "",
      },
    ],
    //fin array tabla
    editedIndex: -1,

    editedItem: {
      id: "",
      descripcion: "",
      dependencia: "",
      peticion: "",
      estatus: "",
      promotor: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Detalle petición";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.peticiones.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteItemConfirm();
    },

    deleteItemConfirm() {
      this.$swal({
        title: "¿Está seguro?",
        text: "El usuario será eliminado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              process.env.VUE_APP_SERVICE_URL + "user/" + this.editedItem.id
            )
            .then(() => {
              this.getUsuarios();
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          this.$swal("Eliminado", "Usuario eliminado con éxito.", "success");
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.newItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.newItem);
        this.editedIndex = -1;
      });
    },

    guardarUsuario() {
      console.log(this.newItem);
      axios
        .post(process.env.VUE_APP_SERVICE_URL + "user/register", this.newItem)
        .then(
          this.$swal({
            title: "Crear Usuario",
            text: "Usuario registrado con éxito",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              this.getUsuarios();
              this.closeNewItem();
            }
          })
        )
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    buscarVecino() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL + "persona/dpi/" + this.persona.dpi
        )
        .then((response) => {
          this.vecino = response.data.persona;
          this.peticion.persona_id = response.data.persona.id; //asigna el id del vecino a la variable persona_id del array peticion
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    buscarPeticionesVecino() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "gestion/vecino/" +
            this.persona.dpi +
            "/" +
            JSON.parse(localStorage.getItem("alcaldia"))
        )
        .then((response) => {
          this.peticiones = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    buscarGestionSeguimiento() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "gestion/seguimiento/" +
            this.editedItem.id
        )
        .then((response) => {
          this.seguimiento = response.data;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
  },
};
</script>
