<template>
  <v-container>
    <template>
      <h1 class="display-1 text-left font-weight-bold mb-3">
        Lista de Usuarios
      </h1>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :search="search"
        :loading="loading"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>
            <!-- Editar usuario -->

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombres"
                          label="Nombres"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.apellidos"
                          label="Apellidos"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.username"
                          label="Usuario"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nit"
                          label="NIT"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.dpi"
                          label="DPI"
                        ></v-text-field>
                      </v-col>

                      <v-select
                        v-model="editedItem.alcaldia_id"
                        :items="alcaldias"
                        item-text="alcaldia"
                        item-value="zona_id"
                        label="Alcaldia"
                        outlined
                        color="#10069f"
                        @change="getDistritoEdit(), getSectorEdit()"
                      ></v-select>
                      <v-select
                        v-model="editedItem.distrito_id"
                        :items="distrito"
                        item-text="distrito"
                        item-value="distrito_id"
                        label="Distrito"
                        outlined
                        color="#10069f"
                        v-if="
                          editedItem.alcaldia_id == '1' ||
                          editedItem.alcaldia_id == '4'
                        "
                      ></v-select>

                      <v-select
                        v-model="editedItem.sector_id"
                        :items="sector"
                        item-text="sector"
                        item-value="id"
                        label="Sector"
                        outlined
                        color="#10069f"
                        v-if="editedItem.alcaldia_id == '3'"
                      ></v-select>
                      <v-select
                        v-model="editedItem.rol_id"
                        :items="roles"
                        item-text="rol"
                        item-value="id"
                        label="Rol de usuario"
                        outlined
                        color="#10069f"
                      ></v-select>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="editarUsuario">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

            <!-- Crear usuario -->

            <v-dialog v-model="dialogNewItem" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      v-model="valid"
                      @submit.prevent="guardarUsuario"
                    >
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.nombres"
                            label="Nombres"
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.apellidos"
                            label="Apellidos"
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.username"
                            label="Usuario"
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.password"
                            label="Contraseña"
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.nit"
                            label="NIT"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newItem.dpi"
                            label="DPI"
                            type="number"
                            :rules="Rules"
                          ></v-text-field>
                        </v-col>
                        <v-select
                          v-model="newItem.alcaldia_id"
                          :items="alcaldias"
                          item-text="alcaldia"
                          item-value="zona_id"
                          label="Alcaldia"
                          outlined
                          color="#10069f"
                          @change="getDistrito(), getSector()"
                          :rules="Rules"
                        ></v-select>
                        <v-select
                          v-model="newItem.distrito_id"
                          :items="distrito"
                          item-text="distrito"
                          item-value="distrito_id"
                          label="Distrito"
                          outlined
                          color="#10069f"
                          v-if="
                            newItem.alcaldia_id == '1' ||
                            newItem.alcaldia_id == '4'
                          "
                        ></v-select>

                        <v-select
                          v-model="newItem.sector_id"
                          :items="sector"
                          item-text="sector"
                          item-value="id"
                          label="Sector"
                          outlined
                          color="#10069f"
                          v-if="newItem.alcaldia_id == '3'"
                        ></v-select>

                        <v-select
                          v-model="newItem.rol_id"
                          :items="roles"
                          item-text="rol"
                          item-value="id"
                          label="Rol de usuario"
                          outlined
                          color="#10069f"
                          :rules="Rules"
                        ></v-select>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeNewItem"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn color="blue darken-1" text type="submit">
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Acciones Editar-Eliminar -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item), getDistritoEdit(), getSectorEdit()"
          >
            mdi-pencil
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
  mounted() {
    this.getUsuarios();
    this.getAlcaldias();
    this.getRoles();
  },

  data: () => ({
    search: "",
    dialog: false,
    loading: false,
    dialogDelete: false,
    dialogNewItem: false,
    valid: true,
    Rules: [(v) => !!v || "Campo requerido"],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Usuario", value: "username" },
      { text: "NIT", value: "nit" },
      { text: "DPI", value: "dpi" },
      { text: "Rol", value: "rol" },
      { text: "Alcaldía", value: "alcaldia" },
      { text: "Distrito", value: "distrito" },
      { text: "Sector", value: "sector" },
      { text: "Acción", value: "actions", sortable: false },
    ],
    //Array que muestra los datos en tabla
    usuarios: [
      {
        id: "",
        nombres: "",
        apellidos: "",
        username: "",
        nit: "",
        dpi: "",
        rol_id: "",
        alcaldia_id: "",
      },
    ],
    //fin array tabla
    editedIndex: -1,

    editedItem: {
      id: "",
      nombres: "",
      apellidos: "",
      username: "",
      password: null,
      nit: "",
      dpi: "",
      rol_id: "",
      alcaldia_id: "",
      distrito_id: "",
      distrito: "",
      sector_id: "",
      updated_at: "",
    },
    newItem: {
      rol_id: "",
      alcaldia_id: "",
      distrito_id: null,
      sector_id: null,
      nombres: "",
      apellidos: "",
      username: "",
      password: "",
      nit: "",
      dpi: "",
      usuario_creador: JSON.parse(localStorage.getItem("username")),
    },
    alcaldias: [],
    roles: [],
    zona: [],
    distrito: [],
    sector: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogNewItem(val) {
      val || this.closeNewItem();
    },
  },

  methods: {
    getUsuarios() {
      this.loading = true;
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "user/usuarios")
        .then((response) => {
          this.usuarios = response.data.usuarios;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    getAlcaldias() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/alcaldias")
        .then((response) => {
          this.alcaldias = response.data.alcaldias;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getRoles() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/roles")
        .then((response) => {
          this.roles = response.data.roles;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
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

    closeNewItem() {
      this.dialogNewItem = false;
      this.$nextTick(() => {
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

    editarUsuario() {
      this.editedItem.usuario_actualiza = JSON.parse(
        localStorage.getItem("username")
      );
      axios
        .put(
          process.env.VUE_APP_SERVICE_URL + "user/" + this.editedItem.id,
          this.editedItem
        )
        .then(
          this.$swal({
            title: "Editar Usuario",
            text: "Usuario editado con éxito",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              this.getUsuarios();
              this.close();
            }
          })
        )

        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    guardarUsuario() {
      this.$refs.form.validate();
      if (this.valid) {
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
                this.limpiar();
              }
            })
          )
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },

    getDistrito() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/distritos/" +
            this.newItem.alcaldia_id
        )
        .then((response) => {
          this.distrito = response.data.distritos;
          // console.log(this.distrito);
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
            this.newItem.alcaldia_id
        )
        .then((response) => {
          this.sector = response.data.sectores;
          // console.log(this.sector);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    //para distritos y sectores edit
    getDistritoEdit() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/distritos/" +
            this.editedItem.alcaldia_id
        )
        .then((response) => {
          this.distrito = response.data.distritos;
          // console.log(this.distrito);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getSectorEdit() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/sectores/" +
            this.editedItem.alcaldia_id
        )
        .then((response) => {
          this.sector = response.data.sectores;
          // console.log(this.sector);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    limpiar() {
      this.newItem = {
        rol_id: "",
        alcaldia_id: "",
        distrito_id: "",
        sector_id: "",
        nombres: "",
        apellidos: "",
        username: "",
        password: "",
        nit: "",
        dpi: "",
        zona: "",
        usuario_creador: "jtobar",
      };
    },
  },
};
</script>
