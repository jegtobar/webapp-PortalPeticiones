<template>
  <v-container>
    <template>
      <v-row>
        <v-col class="mb-4">
          <h1 class="display-1 text-left font-weight-bold mb-3">
            Estados Vecinos Muy Satisfechos
          </h1>
          <v-select
            v-model="alcaldias.alcaldia_id"
            :items="alcaldias"
            item-text="alcaldia"
            item-value="id"
            label="Seleccione alcaldia"
            outlined
            color="#10069f"
            @change="getMetas(), getColonias(), getPromotor()"
          >
          </v-select>
          <v-data-table
            :headers="headers"
            :items="metas"
            :search="search"
            class="elevation-1"
            fixed-header
            v-if="
              alcaldias.alcaldia_id == '1' ||
              alcaldias.alcaldia_id == '2' ||
              alcaldias.alcaldia_id == '3' ||
              alcaldias.alcaldia_id == '4'
            "
          >
            <template v-slot:item.actual="{ item }">
              <v-chip color="#97d700" dark>
                {{ item.actual }}
              </v-chip>
            </template>
            <template v-slot:item.por_alcanzar="{ item }">
              <v-chip color="#F92D2D" dark>
                {{ item.por_alcanzar }}
              </v-chip>
            </template>
            <template v-slot:item.meta="{ item }">
              <v-chip color="#10069f" dark>
                {{ item.meta }}
              </v-chip>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Lista de Estados</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <!-- DIALOGO NUEVA META -->
                <v-dialog v-model="dialog" max-width="1000px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Nuevo Estado
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.fecha"
                              label="Fecha Registro"
                              type="date"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="colonias.lugar"
                              :items="colonias"
                              item-text="colonia"
                              item-value="id"
                              label="Lugar"
                              required
                            >
                            </v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.meta"
                              label="Meta"
                              type="number"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.responsable"
                              label="Responsable"
                              :items="promotor"
                              item-text="promotor"
                              item-value="id"
                              required
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="guardarMeta()">
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- DIALOGO EDITAR META -->
                <v-dialog v-model="dialogEdit" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.meta"
                              label="Meta"
                              type="number"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.responsable"
                              label="Responsable"
                              :items="promotor"
                              item-text="promotor"
                              item-value="id"
                              required
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeEdit">
                        Cancelar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="editarMeta()">
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="1000px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <!-- <v-icon
                      small
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon> -->
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </template>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    this.getAlcaldias();
  },

  data: () => ({
    search: "",
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogNewItem: false,
    step: 1,
    headers: [
      {
        text: "Fecha registro",
        align: "start",
        sortable: false,
        value: "fecha",
      },
      { text: "Lugar", value: "colonia" },
      { text: "Estado", value: "meta" },
      { text: "Actual", value: "actual" },
      { text: "Por alcanzar", value: "por_alcanzar" },
      { text: "Responsable", value: "responsable" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    alcaldias: [],
    metas: [],
    promotor: [],
    colonias: [],
    editedIndex: -1,
    editedItem: {
      meta: "",
      responsable: "",
      usuario_creador: JSON.parse(localStorage.getItem("username")),
    },
    newItem: {
      alcaldia_id: "",
      fecha: "",
      lugar: "",
      meta: "",
      responsable: "",
      por_alcanzar: "",
      usuario_creador: JSON.parse(localStorage.getItem("username")),
    },
    defaultItem: {
      fecha: "",
      lugar: "",
      meta: "",
      responsable: "",
      por_alcanzar: "",
      usuario_creador: JSON.parse(localStorage.getItem("username")),
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Estado" : "Editar Estado";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.metas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    deleteItem(item) {
      this.editedIndex = this.metas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.metas.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeEdit() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    getPromotor() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "user/promotorcoordinador/" +
            this.alcaldias.alcaldia_id
        )
        .then((response) => {
          this.promotor = response.data.user;
          // console.log(this.promotor);
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

    getColonias() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/coloniasporzona/" +
            this.alcaldias.alcaldia_id
        )
        .then((response) => {
          this.colonias = response.data.colonias;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getMetas() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "metas/mntomuysatisfechos/" +
            this.alcaldias.alcaldia_id
        )
        .then((response) => {
          this.metas = response.data.metas;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    guardarMeta() {
      this.newItem.colonia_id = this.colonias.lugar;
      this.newItem.por_alcanzar = this.newItem.meta;
      this.newItem.alcaldia_id = this.alcaldias.alcaldia_id;
      axios
        .post(
          process.env.VUE_APP_SERVICE_URL + "metas/mntomuysatisfechos/crear",
          this.newItem
        )
        .then((response) => {
          if (response.data.res) {
            this.$swal("Ya existe una estado en el lugar seleccionado");
            this.limpiar();
          } else {
            this.$swal({
              title: "Nuevo Estado",
              text: "Registrada con éxito",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                this.close();
                this.getMetas();
                this.limpiar();
              }
            });
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    editarMeta() {
      axios
        .put(
          process.env.VUE_APP_SERVICE_URL +
            "metas/mntomuysatisfechos/actualizar/" +
            this.editedItem.id,
          this.editedItem
        )
        .then(
          this.$swal({
            title: "Editar Estado",
            text: "Cambios guardados con éxito",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              this.getMetas();
              this.closeEdit();
            }
          })
        )

        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    limpiar() {
      this.newItem = {
        alcaldia_id: "",
        fecha: "",
        lugar: "",
        meta: "",
        responsable: "",
        usuario_creador: JSON.parse(localStorage.getItem("username")),
      };
    },
  },
};
</script>
