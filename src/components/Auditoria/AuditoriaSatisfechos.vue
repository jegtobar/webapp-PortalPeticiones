<template>
    <v-container>
          <template>
            <v-row>
                <v-col class="mb-4">
                    <h1 class="display-1 text-left font-weight-bold mb-3">Auditoría: Mantenimiento Peticiones Vecinos Satisfechos</h1>
                </v-col>
            </v-row>


            <v-row>
              <v-col class="mb-4">
              <v-select
                v-model="alcaldias.alcaldia_id"
                :items="alcaldias"
                item-text="alcaldia"
                item-value='id'
                label="Seleccione alcaldia"
                outlined
                color="#10069f"
                @change="getPersonas()"
              >
            </v-select>
              <v-data-table
                :headers="headers"
                :items="personas"
                :search="search"
                class="elevation-1"
                v-if="alcaldias.alcaldia_id=='1'||alcaldias.alcaldia_id=='2'||alcaldias.alcaldia_id=='3'||alcaldias.alcaldia_id=='4'"
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
        <!--Seguimiento-->
        <v-dialog
          v-model="dialogSeguimiento"
          max-width="1000px"
        >
        <v-card>
          <v-banner 
              elevation="9"
              outlined
              rounded
              class="indigo darken-4 white--text"
          >
          <v-icon class="white">mdi-account</v-icon>
             Historial de seguimiento del vecino.
          </v-banner>
          <template>
              <v-data-table
                :headers="headersActividad"
                :items="seguimiento"
                :items-per-page="5"
                class="elevation-1"
              >
               <template v-slot:item.actionsSeguimiento="{ item }">
                  <v-icon
                     small
                     class="mr-2"
                      @click="auditarSeguimiento(item)"
                     title="No realizada"
                  >
                   mdi-thumb-down-outline
                  </v-icon>          
                            
                </template>
              </v-data-table>
          </template>   
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cerrar
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
                      title="Ver seguimiento"
                    >
                      mdi-book-check
                    </v-icon>
                    
                  </template>
                </v-data-table>
                </v-col>
            </v-row>
            <v-row>
            <v-col>
              <v-btn 
              @click="obtener_datos()" 
              elevation="" 
              color="light-green accent-4"
              v-if="alcaldias.alcaldia_id=='1'||alcaldias.alcaldia_id=='2'||alcaldias.alcaldia_id=='3'||alcaldias.alcaldia_id=='4'"
              >Ver reporte</v-btn>	
            </v-col>
          </v-row>
        </template>  
              <Dialog>
                <template #content>
                  <DialogContent :pdf_url="pdf_url" />
                </template>
              </Dialog>   
    </v-container>
</template>
<script>
import axios from 'axios';
import Dialog from '@/components/Dialog/Dialog'
import DialogContent from '@/components/Auditoria/DialogContent'
import { mapMutations } from 'vuex';


  export default {
        mounted(){
        
        this.getAlcaldias();
    },
      
    data: () => ({
      search: '',
      dialog: false,
      dialogSeguimiento:false,

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
          // { text: 'DPI', value: 'dpi' },
        //   { text: 'Fecha de nacimiento', value: 'nacimiento' },
          { text: 'Dirección', value: 'direccion' },
          { text: 'No. Casa', value: 'numero_casa' },
          { text: 'Zona', value: 'zona' },
          { text: 'Colonia', value: 'colonia' },
          { text: 'Teléfono Domiciliar', value: 'telefono_casa' },
          { text: 'Celular', value: 'celular' },
          { text: 'Correo', value: 'correo' },
          { text: 'Género', value: 'genero' },
          { text: 'Tipo de Vecino', value: 'tipo'},
          { text: 'Acciones', value: 'actions', sortable: false },
      ],
       headersActividad: [
         {
            text: 'Fecha',
            align: 'start',
            sortable: false,
            value: 'fecha',
          },
          { text: 'Actividad', value: 'actividad' },
          { text: 'Descripción', value: 'descripcion' },
          { text: 'Acciones', value: 'actionsSeguimiento', sortable: false },

      ],
    alcaldias:[],
    vecino:[],
    persona:[],
    seguimiento:[],
    nSeguimiento:[],
    seguimientoVecinosSatisfechos:[],
    realizado:{
      "realizado":"0"
    },
     actRealizado:{
      "realizado":"0",
      "auditor":JSON.parse(localStorage.getItem('user_id'))
    },
    actividades:[],
    peticiones:[],
    zonas:[],
    liderazgo:[],
    personas:[],
    colonias:[],
      editedIndex: -1,
    }),

    computed: {
      // formTitle () {
      //   return this.editedIndex === -1 ? 'Nuevo Vecino' : 'Editar Vecino' 
      // },
    },

    watch: {
      dialog (val) {
        val || this.close()
        val || this.closeNew()
      },
      dialogNewItem(val){
        val || this.closeNewItem()
      },

      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    // created () {
    //   this.initialize()
    // },

    methods: {

      getAlcaldias(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/alcaldias')
                .then((response)=>{
                    this.alcaldias=response.data.alcaldias;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
      },
        getPersonas(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'persona/listaMntoSatisfechosAuditoria/'+this.alcaldias.alcaldia_id)
                .then((response)=>{
                    this.personas=response.data.personas;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
        },
        ...mapMutations({
			setShow: 'dialog/setShow'
        }),
        obtener_datos(){

          // console.log(this.alcaldias.alcaldia_id)

          axios.get(process.env.VUE_APP_SERVICE_URL+'reporte/mntosatisfechos/'+ this.alcaldias.alcaldia_id)
                .then((response)=>{
            //this.seguimiento=response.data;
            console.log(response.data)
            this.pdf_url = response.data.url_pdf
            this.setShow(true)
          })
          .catch(function(error){
          console.log(error.response.data);
          })

        },

      editItem (item) {
        this.seguimientoVecinosSatisfechos = Object.assign({}, item)
        this.buscarSeguimientoVecino();
        this.dialogSeguimiento = true

      },

       close () {
        this.dialogSeguimiento = false
      },


        buscarSeguimientoVecino(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'gestion/seguimiento/mntovecinosatisfecho/'+this.seguimientoVecinosSatisfechos.id)
            .then((response)=>{
                        this.seguimiento=response.data;
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },

        auditarSeguimiento(item){
                this.realizado = Object.assign({}, item)
                 this.$swal({
                      title:'¿Está seguro?',
                      text: "El seguimiento será determinado como no realizado",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Si',
                      cancelButtonText:'No'
                }).then((result)=>{
                    if (result.isConfirmed) {
                    axios.put(process.env.VUE_APP_SERVICE_URL+'gestion/mntoseguimientosatisfecho/actualizar/'+this.realizado.id, this.actRealizado)
                    .then(()=>{
                      this.buscarSeguimientoVecino()
                      
                    })
                    .catch(function(error){
                        console.log(error.response.data);
                    })
                    this.$swal(
                    'Actualizado',
                    'Seguimiento determinado como no realizado.',
                    'success'
                    )
                    }
                })
            
        },
    },
    components : {
          Dialog,
          DialogContent
    }
  }
</script>
