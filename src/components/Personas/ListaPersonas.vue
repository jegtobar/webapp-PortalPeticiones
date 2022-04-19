      
<template>
  <v-data-table
    :headers="headers"
    :items="personas"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Vecinos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1000px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
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
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nacimiento"
                      label="Fecha de nacimiento"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.direccion"
                      label="Dirección"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numero_casa"
                      label="No. Casa"
                    ></v-text-field>
                  </v-col>
                   <v-col
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
                  </v-col>
                  <v-col
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
                   
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.telefono_casa"
                      label="Teléfono Residencial"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.celular"
                      label="Celular"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
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
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-model="editedItem.liderazgo"
                    :items="liderazgo"
                    item-text="liderazgo"
                    item-value='liderazgo'
                    label="Liderazgo comunitario"
                    outlined
                    color="#10069f"
                    ></v-select>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
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
                @click="editarPersona"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

<!-- Crear Vecino -->

     <v-dialog
          v-model="dialogNewItem"
          max-width="1000px"
        >
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
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.pNombre"
                      label="Primer Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.sNombre"
                      label="Segundo Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.tNombre"
                      label="Tercer Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.pApellido"
                      label="Primer Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.sApellido"
                      label="Segundo Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.tApellido"
                      label="Apellido de Casada"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.dpi"
                      label="Número de DPI"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.nacimiento"
                      label="Fecha de nacimiento"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.direccion"
                      label="Dirección"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newItem.numero_casa"
                      label="No. Casa"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select v-model="newItem.zona_id"
                    :items="zonas"
                    item-text="zona"
                    item-value='id'
                    label="Zona"
                    outlined
                    color="#10069f"
                    @change="getColonias()"
                    ></v-select> 
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select v-model="newItem.colonia_id"
                    :items="colonias"
                    item-text="colonia"
                    item-value='id'
                    label="Colonia"
                    outlined
                    color="#10069f"
                    ></v-select> 
                   
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <v-text-field
                      v-model="newItem.telefono_casa"
                      label="Teléfono Residencial"
                      type="number"
                    ></v-text-field>
                    
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="newItem.celular"
                      label="Celular"
                      type="number"
                    ></v-text-field>
                 
                  </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-text-field
                      v-model="newItem.correo"
                      label="Correo Electrónico"
                      type="email"
                    ></v-text-field>
                    
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select v-model="newItem.genero"
                        :items="['M', 'F']"
                        label="Género"
                        outlined
                        color="#10069f"
                    ></v-select>
                    
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-model="newItem.liderazgo"
                    :items="liderazgo"
                    item-text="liderazgo"
                    item-value='liderazgo'
                    label="Liderazgo comunitario"
                    outlined
                    color="#10069f"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeNewItem"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardarPersona"
              >
                Guardar
              </v-btn>
            </v-card-actions>
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
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>
import axios from 'axios';

  export default {
        mounted(){
        this.getPersonas();
        this.getLiderazgo();
        this.getZonas();


    },
      
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogNewItem:false,
      headers: [
         {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Primer Nombre', value: 'pNombre' },
          { text: 'Segundo Nombre', value: 'sNombre' },
          { text: 'Tercer Nombre', value: 'tNombre' },
        //   { text: 'Tercer Nombre', value: 'tNombre' },
          { text: 'Primer Apellido', value: 'pApellido' },
          { text: 'Segundo Apellido', value: 'sApellido' },
          { text: 'Apellido Casada', value: 'tApellido' },
          { text: 'DPI', value: 'dpi' },
        //   { text: 'Fecha de nacimiento', value: 'nacimiento' },
          { text: 'Dirección', value: 'direccion' },
          { text: 'No. Casa', value: 'numero_casa' },
          { text: 'Zona', value: 'zona' },
          { text: 'Colonia', value: 'colonia' },
          { text: 'Teléfono Domiciliar', value: 'telefono_casa' },
          { text: 'Celular', value: 'celular' },
          { text: 'Correo', value: 'correo' },
          { text: 'Género', value: 'genero' },
          { text: 'Liderazgo', value: 'liderazgo' },
          { text: 'Acciones', value: 'actions', sortable: false },
      ],
      editedIndex: -1,

      editedItem: {
        "id":"",
        "pNombre": "",
        "sNombre": "",
        "tNombre": "",
        "pApellido": "",
        "sApellido": "",
        "tApellido": "",
        "dpi": "",
        "nacimiento": "",
        "direccion": "",
        "numero_casa": "",
        "zona_id": "",
        "colonia_id": "",
        "telefono_casa": "",
        "celular":"",
        "correo": "",
        "genero": "",
        "liderazgo": "",
      },
      newItem: {
        "pNombre": "",
        "sNombre": "",
        "tNombre": "",
        "pApellido": "",
        "sApellido": "",
        "tApellido": "",
        "dpi": "",
        "nacimiento": "",
        "direccion": "",
        "numero_casa": "",
        "zona_id": "",
        "colonia_id": "",
        "telefono_casa": "",
        "celular":"",
        "correo": "",
        "genero": "",
        "liderazgo": "",
        "usuario_creador": "jtobar",
      },
            zonas:[],
            liderazgo:[],
            personas:[],
            colonias:[]
          
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Vecino' : 'Editar Vecino'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
        val || this.closeNew()

      },
      dialogNewItem(val){
        val || this.closeNewItem()
      }

    },

    methods: {

        getPersonas(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'persona/lista')
                .then((response)=>{
                    this.personas=response.data.personas;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
        },


        getZonas(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/zonas')
                .then((response)=>{
                    this.zonas=response.data.zonas;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        },
        getColonias(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/coloniasporzona/'+this.newItem.zona_id)
                .then((response)=>{
                    this.colonias=response.data.colonias;
                  
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        }, 
        getColoniasEdit(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/coloniasporzona/'+this.editedItem.zona_id)
                .then((response)=>{
                    this.colonias=response.data.colonias;
                  
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        }, 

        getLiderazgo(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/liderazgo')
                .then((response)=>{
                    this.liderazgo=response.data.liderazgo
                    console.log(this.liderazgo);
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        },

      editItem (item) {
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(this.editedItem)
      },

      deleteItem (item) {
        this.editedIndex = this.personas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.deleteItemConfirm()
        
      },

      deleteItemConfirm () {
            this.$swal({
                title: '¿Está seguro?',
                text: "El vecino será eliminado",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText:'No'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(process.env.VUE_APP_SERVICE_URL+'persona/'+this.editedItem.id)
                    .then(()=>{
                        this.getPersonas()
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                    })
                    this.$swal(
                    'Eliminado',
                    'Vecino eliminado con éxito.',
                    'success'
                    )
                }
                })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.newItem)
          this.editedIndex = -1
        })
      },

      closeNewItem() {
        this.dialogNewItem = false 
        this.$nextTick(() => {
          this.editedIndex = -1
        })
        
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.newItem)
          this.editedIndex = -1
        })
      },


      editarPersona(){
            
            axios.put(process.env.VUE_APP_SERVICE_URL+'persona/'+this.editedItem.id, this.editedItem)
            .then(
                 this.$swal({
                    title:"Editar Vecino",
                    text:"Información actualizada con éxito.",
                    icon:"success"
                }).then((result)=>{
                    if(result.isConfirmed){
                        this.getPersonas();
                        this.close()

                    }
                })
            )
            .catch(function(error){
            console.log(error.response.data)
        })
        },
        guardarPersona(){
            
            axios.post(process.env.VUE_APP_SERVICE_URL+'persona/register', this.newItem)
            .then(
                 this.$swal({
                    title:"Registrar Vecino",
                    text:"Vecino registrado con éxito",
                    icon:"success"
                }).then((result)=>{
                    if(result.isConfirmed){
                        this.getPersonas();
                        this.limpiarNuevo();
                        this.closeNewItem()
                    }
                })
            )
            .catch(function(error){
            console.log(error.response.data)
            })
        
        },
        limpiarNuevo(){
           this.newItem={
            "pNombre": "",
            "sNombre": "",
            "tNombre": "",
            "pApellido": "",
            "sApellido": "",
            "tApellido": "",
            "dpi": "",
            "nacimiento": "",
            "direccion": "",
            "numero_casa": "",
            "zona": "",
            "telefono_casa": "",
            "celular":"",
            "correo": "",
            "genero": "",
            "liderazgo": "",
            "usuario_creador": "jtobar",
          }
        }
    },
  }
</script>



