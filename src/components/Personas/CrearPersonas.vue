<template>
  <v-container>
    <template>
      <v-row>
        <v-col class="mb-4">
          <h1 class="display-1 text-left font-weight-bold mb-3">
            Seguimientos atención de solicitudes
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" class="mb-4">
          <v-text-field
            v-model="persona.vecino"
            label="Ingrese nombre o apellido del vecino"
            :rules="Rules"
            required
          >
          </v-text-field>
          <v-card-actions>
            <v-btn color="primary" class="mr-4" @click="getPersonas()"
              >Buscar</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="personas"
          :search="search"
          :loading="loading"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Vecinos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>

              <v-spacer></v-spacer>
              <!--Editar vecino-->
              <v-dialog v-model="dialogEdit" max-width="1000px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form
                        ref="formEdit"
                        v-model="validEdit"
                        @submit.prevent="editarPersona"
                      >
                        <v-row>
                          <!-- <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.pNombre"
                              label="Primer Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.sNombre"
                              label="Segundo Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.tNombre"
                              label="Tercer Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.pApellido"
                              label="Primer Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.sApellido"
                              label="Segundo Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.tApellido"
                              label="Apellido de Casada"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.dpi"
                              label="Número de DPI"
                              type="number"
                            ></v-text-field>
                          </v-col> -->
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.nacimiento"
                              label="Fecha de nacimiento"
                              type="date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.direccion"
                              label="Dirección"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.numero_casa"
                              label="No. Casa"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                          <v-select v-model="editedItem.zona_id"
                            :items="zonas"
                            item-text="zona"
                            item-value='id'
                            label="Zona"
                            outlined
                            color="#10069f"
                            @change="getColoniasEdit()"
                            ></v-select> 
                          </v-col> -->
                          <!-- <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                          <v-select v-model="editedItem.colonia_id"
                            :items="colonias"
                            item-text="colonia"
                            item-value='id'
                            label="Colonia"
                            outlined
                            color="#10069f"
                            
                            ></v-select> 
                          
                          </v-col> -->
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.telefono_casa"
                              label="Teléfono Residencial"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.celular"
                              label="Celular"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          > -->
                          <!-- <v-text-field
                              v-model="editedItem.correo"
                              label="Correo Electrónico"
                              type="email"
                            ></v-text-field>
                          </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-select v-model="editedItem.genero"
                                :items="['M', 'F']"
                                label="Género"
                                outlined
                                color="#10069f"
                            ></v-select>
                          </v-col> -->

                          <!-- <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-select v-model="editedItem.liderazgo"
                            :items="liderazgo"
                            item-text="liderazgo"
                            item-value='id'
                            label="Tipo de vecino"
                            outlined
                            color="#10069f"
                            ></v-select>
                          </v-col> -->
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
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

              <!-- Crear Vecino -->

              <v-dialog v-model="dialogNewItem" max-width="1000px">
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
                        @submit.prevent="guardarPersona"
                      >
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.pNombre"
                              label="Primer Nombre"
                              :rules="Rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.sNombre"
                              label="Segundo Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.tNombre"
                              label="Tercer Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.pApellido"
                              label="Primer Apellido"
                              :rules="Rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.sApellido"
                              label="Segundo Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.tApellido"
                              label="Apellido de Casada"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                                >
                                  <v-text-field
                                    v-model="newItem.dpi"
                                    label="Número de DPI"
                                    type="number"
                                    
                                  ></v-text-field>
                                </v-col> -->
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.nacimiento"
                              label="Fecha de nacimiento"
                              type="date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.direccion"
                              label="Dirección"
                              :rules="Rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.numero_casa"
                              label="No. Casa"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.zona_id"
                              :items="zonas"
                              item-text="zona"
                              item-value="id"
                              label="Zona"
                              outlined
                              color="#10069f"
                              @change="getColonias()"
                              :rules="Rules"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.colonia_id"
                              :items="colonias"
                              item-text="colonia"
                              item-value="id"
                              label="Colonia"
                              outlined
                              color="#10069f"
                              :rules="Rules"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.telefono_casa"
                              label="Teléfono Residencial"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.celular"
                              label="Celular"
                              type="number"
                              :rules="Rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newItem.correo"
                              label="Correo Electrónico"
                              type="email"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.genero"
                              :items="['M', 'F']"
                              label="Género"
                              outlined
                              color="#10069f"
                              :rules="Rules"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.liderazgo"
                              :items="liderazgo"
                              item-text="liderazgo"
                              item-value="id"
                              label="Tipo de vecino"
                              outlined
                              color="#10069f"
                              :rules="Rules"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="newItem.seguimiento"
                              :items="itemSeguimiento"
                              item-text="tipo"
                              item-value="valor"
                              label="Vecino de tipo"
                              outlined
                              color="#10069f"
                              :rules="Rules"
                            ></v-select>
                          </v-col>
                        </v-row>
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
                      </v-form>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- Modal detalle de peticiones -->
              <v-dialog
                v-model="dialogSeguimiento"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-card-title>
                    <v-toolbar dark color="#10069f">
                      <v-btn icon dark @click="dialogSeguimiento = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        ><span class="text-h5"
                          >Ingresar Seguimiento: {{ vecino }}
                        </span></v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-list-item-content>
                        <v-list-item-subtitle></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-form
                        ref="formSeguimiento"
                        v-model="validSeguimiento"
                        @submit.prevent="guardarSeguimiento"
                      >
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="ingresarSeguimiento.fecha"
                              label="Fecha"
                              type="date"
                              :rules="Rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="ingresarSeguimiento.actividad_id"
                              :items="actividades"
                              item-text="actividad"
                              item-value="id"
                              label="Actividad"
                              outlined
                              color="#10069f"
                              :rules="Rules"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-textarea
                              v-model="ingresarSeguimiento.descripcion"
                              label="Descripción"
                              :rules="Rules"
                            ></v-textarea>
                          </v-col>
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
                              <v-icon dark>
                                mdi-content-save-all-outline
                              </v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-row>
                      </v-form>

                      <br />
                      <v-divider></v-divider>
                      <v-banner
                        elevation="9"
                        outlined
                        rounded
                        class="indigo darken-4 white--text"
                      >
                        <v-icon class="white">mdi-account</v-icon>
                        Historial de seguimiento del vecino.
                      </v-banner>
                      <!-- <v-list-item-content>
                                  <v-list-item-title>Historial de Seguimiento Vecino Satisfecho</v-list-item-title>
                              </v-list-item-content> -->
                      <template>
                        <v-card-title>
                          <v-text-field
                            v-model="buscarSeguimiento"
                            append-icon="mdi-magnify"
                            label="Buscar"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headersActividad"
                          :items="seguimiento"
                          :search="buscarSeguimiento"
                          :loading="loading"
                          :items-per-page="5"
                          class="elevation-1"
                        >
                          <template v-slot:item.actionsActividad="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editSeguimiento(item)"
                              title="Editar Seguimiento"
                            >
                              mdi-pencil
                            </v-icon>

                            <v-icon
                              small
                              @click="deleteSeguimiento(item)"
                              title="Eliminar Seguimiento"
                            >
                              mdi-delete
                            </v-icon>
                            <!-- DIALOGO EDITAR SEGUIMIENTO -->
                            <v-dialog
                              v-model="dialogEditSeguimiento"
                              max-width="1000px"
                              :retain-focus="false"
                            >
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5"
                                    >Editar Seguimiento</span
                                  >
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                          v-model="editarSeguimiento.fecha"
                                          label="Fecha Registro"
                                          type="date"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="4">
                                        <v-select
                                          v-model="
                                            editarSeguimiento.actividad_id
                                          "
                                          :items="actividades"
                                          item-text="actividad"
                                          item-value="id"
                                          label="Actividad"
                                          outlined
                                          color="#10069f"
                                        >
                                        </v-select>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="4">
                                        <v-textarea
                                          v-model="
                                            editarSeguimiento.descripcion
                                          "
                                          label="Descripción"
                                        ></v-textarea>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeEditSeguimiento"
                                  >
                                    Cancelar
                                  </v-btn>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="putSeguimientoSatisfecho"
                                  >
                                    Guardar
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-data-table>
                      </template>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <!-- Acciones Editar-Eliminar -->
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              title="Editar vecino"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="addSeguimiento(item)"
              title="Ver seguimiento"
            >
              mdi-book-check
            </v-icon>
            <!-- <v-icon
                      small
                      @click="deleteItem(item)"
                      title="eliminar vecino"
                    >
                      mdi-delete
                    </v-icon> -->
          </template>
        </v-data-table>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    this.getLiderazgo();
    this.getZonas();
    this.getCatalogoActividades();
  },

  data: () => ({
    search: "",
    loading: false,
    buscarSeguimiento: "",
    valid: true,
    validEdit: true,
    validSeguimiento: true,
    dialog: false,
    dialogSeguimiento: false,
    dialogEditSeguimiento: false,
    dialogNewItem: false,
    dialogEdit: false,
    step: 1,
    Rules: [(v) => !!v || "Campo requerido"],
    emailRules: [(v) => /.+@.+/.test(v) || "E-mail debe ser válido"],
    headers: [
      { text: "Primer Nombre", value: "pNombre" },
      { text: "Segundo Nombre", value: "sNombre" },
      { text: "Tercer Nombre", value: "tNombre" },
      //   { text: 'Tercer Nombre', value: 'tNombre' },
      { text: "Primer Apellido", value: "pApellido" },
      { text: "Segundo Apellido", value: "sApellido" },
      { text: "Apellido Casada", value: "tApellido" },
      // { text: 'Código', value: 'dpi' },
      { text: "Fecha de nacimiento", value: "fecha" },
      { text: "Dirección", value: "direccion" },
      { text: "No. Casa", value: "numero_casa" },
      { text: "Zona", value: "zona" },
      { text: "Colonia", value: "colonia" },
      { text: "Teléfono Domiciliar", value: "telefono_casa" },
      { text: "Celular", value: "celular" },
      { text: "Correo", value: "correo" },
      //   { text: 'Género', value: 'genero' },
      //   { text: 'Liderazgo', value: 'liderazgo' },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    headersActividad: [
      {
        text: "Fecha",
        align: "start",
        sortable: false,
        value: "date",
      },
      { text: "Actividad", value: "actividad" },
      { text: "Descripción", value: "descripcion" },
      { text: "Responsable", value: "responsable" },
      { text: "Acciones", value: "actionsActividad", sortable: false },
    ],
    itemSeguimiento: [
      {
        tipo: "Seguimiento Satisfecho",
        valor: 1,
      },
      {
        tipo: "Seguimiento Muy Satisfecho",
        valor: 3,
      },
      {
        tipo: "Mantenimiento Satisfecho",
        valor: 2,
      },
      {
        tipo: "Mantenimiento Muy Satisfecho",
        valor: 4,
      },
      {
        tipo: "Insatisfecho",
        valor: 5,
      },
    ],
    vecino: [],
    persona: [],
    seguimiento: [],
    nSeguimiento: [],
    alerta: [],
    ingresarSeguimiento: {
      persona_id: "",
      fecha: "",
      actividad: "",
      descripcion: "",
      responsable:
        JSON.parse(localStorage.getItem("nombres")) +
        " " +
        JSON.parse(localStorage.getItem("apellidos")),
    },
    editarSeguimiento: {
      id: "",
      fecha: "",
      actividad: "",
      descripcion: "",
      responsable:
        JSON.parse(localStorage.getItem("nombres")) +
        " " +
        JSON.parse(localStorage.getItem("apellidos")),
    },

    actividades: [],
    peticiones: [],
    zonas: [],
    liderazgo: [],
    personas: [],
    promotor: [],
    colonias: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      pNombre: "",
      sNombre: "",
      tNombre: "",
      pApellido: "",
      sApellido: "",
      tApellido: "",
      dpi: null,
      nacimiento: null,
      direccion: "",
      numero_casa: "",
      zona_id: "",
      colonia_id: "",
      telefono_casa: null,
      celular: "",
      correo: null,
      genero: "",
      liderazgo: "",
      seguimiento: "1",
    },
    newItem: {
      pNombre: "",
      sNombre: "",
      tNombre: "",
      pApellido: "",
      sApellido: "",
      tApellido: "",
      dpi: null,
      nacimiento: null,
      direccion: "",
      numero_casa: "",
      zona_id: "",
      colonia_id: "",
      telefono_casa: null,
      celular: "",
      correo: null,
      genero: "",
      liderazgo: "",
      seguimiento: "", //Seguimiento 1 corresponde a los vecinos satisfechos.
      usuario_creador: JSON.parse(localStorage.getItem("username")),
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Vecino" : "Editar Vecino";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
      val || this.closeNew();
    },
    dialogNewItem(val) {
      val || this.closeNewItem();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // created () {
  //   this.initialize()
  // },

  methods: {
    getPersonas() {
      this.loading = true;
      if (
        JSON.parse(localStorage.getItem("distrito")) === 1 ||
        JSON.parse(localStorage.getItem("distrito")) === 2 ||
        JSON.parse(localStorage.getItem("distrito")) === 3
      ) {
        axios
          .get(
            process.env.VUE_APP_SERVICE_URL +
              "persona/promotores/" +
              JSON.parse(localStorage.getItem("alcaldia")) +
              "/" +
              JSON.parse(localStorage.getItem("distrito")) +
              "/" +
              this.persona.vecino.split(" ").join("_")
          )
          .then((response) => {
            this.personas = response.data.persona;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      } else {
        axios
          .get(
            process.env.VUE_APP_SERVICE_URL +
              "persona/vecinos/zona/" +
              JSON.parse(localStorage.getItem("alcaldia")) +
              "/" +
              this.persona.vecino.split(" ").join("_")
          )
          .then((response) => {
            this.personas = response.data.persona;
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
    getZonas() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/zonas")
        .then((response) => {
          this.zonas = response.data.zonas;
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
            this.newItem.zona_id
        )
        .then((response) => {
          this.colonias = response.data.colonias;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    getColoniasEdit() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "catalogo/coloniasporzona/" +
            this.editedItem.zona_id
        )
        .then((response) => {
          this.colonias = response.data.colonias;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    getLiderazgo() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/liderazgo")
        .then((response) => {
          this.liderazgo = response.data.liderazgo;
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },

    editItem(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
      this.getColoniasEdit();
    },

    editSeguimiento(item) {
      this.editarSeguimiento = Object.assign({}, item);
      // console.log(this.editarSeguimiento.id)
      this.dialogEditSeguimiento = true;
    },

    addSeguimiento(item) {
      // this.editedIndex = this.personas.indexOf(item)
      this.seguimientoVecinosSatisfechos = Object.assign({}, item);
      this.ingresarSeguimiento.persona_id =
        this.seguimientoVecinosSatisfechos.id; //Asignacion del id al campo personas_id
      // this.vecino = this.seguimientoVecinosSatisfechos.seguimiento
      this.ingresarSeguimiento.usuario_creador = JSON.parse(
        localStorage.getItem("username")
      );
      this.buscarSeguimientoVecino();
      this.getPromotor();
      switch (this.seguimientoVecinosSatisfechos.seguimiento) {
        case 1:
          this.vecino = "Vecino Satisfecho";
          break;
        case 2:
          this.vecino = "Mantenimiento Vecino Satisfecho";
          break;
        case 3:
          this.vecino = "Vecino Muy Satisfecho";
          break;
        case 4:
          this.vecino = "Mantenimiento Vecino Muy Satisfecho";
          break;

        default:
          break;
      }
      this.dialogSeguimiento = true;
    },

    deleteItem(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteItemConfirm();
    },

    deleteItemConfirm() {
      this.$swal({
        title: "¿Está seguro?",
        text: "El vecino será eliminado",
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
              process.env.VUE_APP_SERVICE_URL + "persona/" + this.editedItem.id
            )
            .then(() => {
              this.getPersonas();
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          this.$swal("Eliminado", "Vecino eliminado con éxito.", "success");
        }
      });
    },

    close() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.newItem);
        this.editedIndex = -1;
      });
    },

    closeEditSeguimiento() {
      this.dialogEditSeguimiento = false;
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

    editarPersona() {
      this.$refs.formEdit.validate();
      if (this.validEdit) {
        this.editedItem.usuario_actualiza = JSON.parse(
          localStorage.getItem("username")
        );
        this.editedItem.usuario_actualiza = JSON.parse(
          localStorage.getItem("username")
        );
        axios
          .put(
            process.env.VUE_APP_SERVICE_URL + "persona/" + this.editedItem.id,
            this.editedItem
          )
          .then(
            this.$swal({
              title: "Editar Vecino",
              text: "Información actualizada con éxito.",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                this.getPersonas();
                this.close();
              }
            })
          )
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
    guardarPersona() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post(
            process.env.VUE_APP_SERVICE_URL + "persona/register",
            this.newItem
          )
          .then(
            this.$swal({
              title: "Registrar Vecino",
              text: "Vecino registrado con éxito",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                this.getPersonas();
                this.limpiarNuevo();
                this.closeNewItem();
              }
            })
          )
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
    getPromotor() {
      axios
        .get(
          process.env.VUE_APP_SERVICE_URL +
            "user/promotorcoordinador/" +
            this.seguimientoVecinosSatisfechos.zona_id
        )
        .then((response) => {
          this.promotor = response.data.user;
          // console.log(this.promotor);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    getCatalogoActividades() {
      axios
        .get(process.env.VUE_APP_SERVICE_URL + "catalogo/actividades")
        .then((response) => {
          this.actividades = response.data.actividades;
          // console.log(this.actividades);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    buscarSeguimientoVecino() {
      this.loading = true;
      switch (this.seguimientoVecinosSatisfechos.seguimiento) {
        case 1:
          axios
            .get(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimiento/vecinosatisfecho/" +
                this.seguimientoVecinosSatisfechos.id
            )
            .then((response) => {
              this.seguimiento = response.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        case 2:
          axios
            .get(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimiento/mntovecinosatisfecho/" +
                this.seguimientoVecinosSatisfechos.id
            )
            .then((response) => {
              this.seguimiento = response.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        case 3:
          axios
            .get(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimiento/vecinomuysatisfecho/" +
                this.seguimientoVecinosSatisfechos.id
            )
            .then((response) => {
              this.seguimiento = response.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        case 4:
          axios
            .get(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimiento/mntovecinomuysatisfecho/" +
                this.seguimientoVecinosSatisfechos.id
            )
            .then((response) => {
              this.seguimiento = response.data;
              this.loading = false;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        default:
          break;
      }
    },
    guardarSeguimiento() {
      this.$refs.formSeguimiento.validate();
      if (this.validSeguimiento) {
        axios
          .post(
            process.env.VUE_APP_SERVICE_URL + "gestion/seguimientos/create",
            this.ingresarSeguimiento
          )
          .then((response) => {
            this.alerta = response.data;
            if (this.alerta == "true") {
              this.$swal({
                title: "Seguimiento registrado con éxito",
                text: "El vecino ha sido trasladado a Mantenimiento",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getPersonas();
                  this.limpiarSeguimiento();
                }
              });
            } else {
              this.$swal({
                title: "Registrar Seguimiento",
                text: "Registrado con éxito",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getPersonas();
                  this.limpiarSeguimiento();
                }
              });
            }
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    },
    limpiarNuevo() {
      this.newItem = {
        pNombre: "",
        sNombre: "",
        tNombre: "",
        pApellido: "",
        sApellido: "",
        tApellido: "",
        dpi: null,
        nacimiento: null,
        direccion: "",
        numero_casa: "",
        zona_id: "",
        colonia_id: "",
        telefono_casa: null,
        celular: "",
        correo: null,
        genero: "",
        liderazgo: "",
        seguimiento: "", //Seguimiento 1 corresponde a los vecinos satisfechos.
        usuario_creador: JSON.parse(localStorage.getItem("username")),
      };
    },
    limpiarSeguimiento() {
      this.ingresarSeguimiento = {
        persona_id: "",
        fecha: "",
        actividad: "",
        descripcion: "",
      };
    },
    putMantenimiento() {
      this.editedItem.seguimiento = {
        seguimiento: "2",
      };
      this.$swal({
        title: "¿Trasladar a Mantenimiento?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              process.env.VUE_APP_SERVICE_URL +
                "persona/mantenimiento/" +
                this.seguimientoVecinosSatisfechos.id,
              this.editedItem.seguimiento
            )
            .then(() => {
              this.getPersonas();
              this.$refs.mantenimiento.getPersonas();
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
    },
    putSeguimientoSatisfecho() {
      switch (this.seguimientoVecinosSatisfechos.seguimiento) {
        case 1:
          axios
            .put(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimientosatisfecho/actualizar/" +
                this.editarSeguimiento.id,
              this.editarSeguimiento
            )
            .then(
              this.$swal({
                title: "Editar Seguimiento",
                text: "Cambios guardados con éxito",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                }
              })
            )

            .catch(function (error) {
              console.log(error.response.data);
            });
          break;
        case 2:
          axios
            .put(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/mntoseguimientosatisfecho/actualizar/" +
                this.editarSeguimiento.id,
              this.editarSeguimiento
            )
            .then(
              this.$swal({
                title: "Editar Seguimiento",
                text: "Cambios guardados con éxito",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                }
              })
            )
            .catch(function (error) {
              console.log(error.response.data);
            });
          break;
        case 3:
          axios
            .put(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/seguimientomuysatisfecho/actualizar/" +
                this.editarSeguimiento.id,
              this.editarSeguimiento
            )
            .then(
              this.$swal({
                title: "Editar Seguimiento",
                text: "Cambios guardados con éxito",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                }
              })
            )

            .catch(function (error) {
              console.log(error.response.data);
            });
          break;
        case 4:
          axios
            .put(
              process.env.VUE_APP_SERVICE_URL +
                "gestion/mntoseguimientomuysatisfecho/actualizar/" +
                this.editarSeguimiento.id,
              this.editarSeguimiento
            )
            .then(
              this.$swal({
                title: "Editar Seguimiento",
                text: "Cambios guardados con éxito",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                }
              })
            )

            .catch(function (error) {
              console.log(error.response.data);
            });
          break;

        default:
          break;
      }
    },
    deleteSeguimiento(item) {
      this.editarSeguimiento = Object.assign({}, item);

      this.$swal({
        title: "¿Está seguro?",
        text: "El seguimiento será eliminado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          switch (this.seguimientoVecinosSatisfechos.seguimiento) {
            case 1:
              console.log(this.seguimientoVecinosSatisfechos.seguimiento);
              axios
                .delete(
                  process.env.VUE_APP_SERVICE_URL +
                    "gestion/seguimientosatisfecho/eliminar/" +
                    this.editarSeguimiento.id
                )
                .then(() => {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
              break;

            case 2:
              console.log(this.seguimientoVecinosSatisfechos.seguimiento);
              axios
                .delete(
                  process.env.VUE_APP_SERVICE_URL +
                    "gestion/mntoseguimientosatisfecho/eliminar/" +
                    this.editarSeguimiento.id
                )
                .then(() => {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
              break;

            case 3:
              console.log(this.seguimientoVecinosSatisfechos.seguimiento);
              axios
                .delete(
                  process.env.VUE_APP_SERVICE_URL +
                    "gestion/seguimientomuysatisfecho/eliminar/" +
                    this.editarSeguimiento.id
                )
                .then(() => {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
              break;

            case 4:
              console.log(this.seguimientoVecinosSatisfechos.seguimiento);
              axios
                .delete(
                  process.env.VUE_APP_SERVICE_URL +
                    "gestion/mntoseguimientomuysatisfecho/eliminar/" +
                    this.editarSeguimiento.id
                )
                .then(() => {
                  this.buscarSeguimientoVecino();
                  this.closeEditSeguimiento();
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
              break;

            default:
              break;
          }
          this.$swal(
            "Eliminado",
            "Seguimiento eliminado con éxito.",
            "success"
          );
        }
      });
    },
  },
};
</script>
