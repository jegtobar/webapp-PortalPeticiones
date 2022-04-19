<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-1 font-weight-bold text-left">Ingreso de Seguimiento Vecino  </h1>
            </v-col>
        </v-row>
                
                <v-row>
                    <v-col class="mb-4">
                        <v-text-field v-model="persona.dpi"
                        label="Ingrese DPI del vecino o número de celular" 
                        >
                        </v-text-field> 
                        <v-card-actions>
                            <v-btn color="primary" class="mr-4" @click="buscarVecino()">Buscar</v-btn>
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
                            <v-card
                                class="mx-auto"
                                max-width="auto"
                                outlined
                                elevation="9"
                            >
                                <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                    Vecino: {{vecino.nombre}} {{vecino.apellido}} 
                                    </v-list-item-title>
                                    <v-list-item-subtitle><strong>DPI:</strong> {{vecino.dpi}}</v-list-item-subtitle>
                                    <v-list-item-subtitle><strong>Dirección:</strong>{{vecino.direccion}}</v-list-item-subtitle>
                                    <v-list-item-subtitle><strong>Teléfono:</strong> {{vecino.celular}}</v-list-item-subtitle>
                                    <v-list-item-subtitle><strong>Liderazgo:</strong> {{vecino.liderazgo}}</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                            </v-card>                        
                        </v-col>

                    </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-banner
                elevation="9"
                outlined
                rounded
                class="indigo darken-4 white--text"
                >
                <v-icon class="white">mdi-notebook-edit</v-icon>
                    Seguimiento
                </v-banner>
                <br>
                <v-form 
                    ref="formSeguimiento"
                    v-model="validSeguimiento"
                    @submit.prevent="guardarSeguimiento"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="seguimientoVecinosSatisfechos.fecha"
                        label="Fecha"
                        type="date"
                        :rules="Rules"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select 
                          v-model="seguimientoVecinosSatisfechos.actividad_id"
                          :items="actividades"
                          item-text="actividad"
                          item-value="id"
                          label="Actividad"
                          outlined
                          color="#10069f"
                          :rules="Rules"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select
                      v-model="seguimientoVecinosSatisfechos.responsable"
                      label="Responsable"
                      outlined
                      :items="promotor"
                      item-text="promotor"
                      item-value="promotor"
                      :rules="Rules"
                    >
                    </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                     <v-textarea
                        v-model="seguimientoVecinosSatisfechos.descripcion"
                        label="Descripción"
                        :rules="Rules"
                    ></v-textarea>
                    </v-col>
                    <v-card-actions >
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
    </v-container>
</template>



<script>
import axios from 'axios'
export default {
    name:'crearPeticion',
    mounted(){
        this.getCatalogoActividades();
          
    },
    data: () => ({        
            validSeguimiento: true,
             Rules: [
                v => !!v || 'Campo requerido',
            ],            
            seguimientoVecinosSatisfechos:{
                "persona_id":"",
                "fecha":"",
                "actividad_id":"",
                "descripcion":"",
                "responsable":""
                },
            actividades:[],
            persona:[],
            vecino:{
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "dpi": null,
                "celular": null,
                "id": null,
                "liderazgo": "",
                "zona_id": null,
                "seguimiento": null 
            },
            promotor:[],

    }),
    methods:{

        guardarSeguimiento(){
            this.$refs.formSeguimiento.validate()
            switch (this.vecino.seguimiento) {
                case 1:
                    if(this.validSeguimiento){
                    axios.post(process.env.VUE_APP_SERVICE_URL+'gestion/seguimientosatisfecho/create', this.seguimientoVecinosSatisfechos)
                    .then(
                        this.$swal({
                            title:"Registrar Seguimiento",
                            text:"Registrado con éxito",
                            icon:"success"
                        }).then((result)=>{
                            if(result.isConfirmed){
                                this.limpiar()
                    }
                })
            )
            .catch(function(error){
            console.log(error.response.data)
            })
          }
                    break;
                case 2:
                    if(this.validSeguimiento){
                    axios.post(process.env.VUE_APP_SERVICE_URL+'gestion/mntoseguimientosatisfecho/create', this.seguimientoVecinosSatisfechos)
                    .then(
                        this.$swal({
                            title:"Registrar Seguimiento",
                            text:"Registrado con éxito",
                            icon:"success"
                        }).then((result)=>{
                            if(result.isConfirmed){
                                this.limpiar()
                                }
                            })
                        )
                        .catch(function(error){
                        console.log(error.response.data)
                        })
                    }
                    break;
                
                case 3:
                    if(this.validSeguimiento){
                    axios.post(process.env.VUE_APP_SERVICE_URL+'gestion/seguimientomuysatisfecho/create', this.seguimientoVecinosSatisfechos)
                    .then(
                        this.$swal({
                            title:"Registrar Seguimiento",
                            text:"Registrado con éxito",
                            icon:"success"
                        }).then((result)=>{
                            if(result.isConfirmed){
                                this.limpiar()
                                }
                            })
                        )
                        .catch(function(error){
                        console.log(error.response.data)
                        })
                    }
                    break;
                
                case 4:
                    if(this.validSeguimiento){
                    axios.post(process.env.VUE_APP_SERVICE_URL+'gestion/mntoseguimientomuysatisfecho/create', this.seguimientoVecinosSatisfechos)
                    .then(
                        this.$swal({
                            title:"Registrar Seguimiento",
                            text:"Registrado con éxito",
                            icon:"success"
                        }).then((result)=>{
                            if(result.isConfirmed){
                                this.limpiar()
                                }
                            })
                        )
                        .catch(function(error){
                        console.log(error.response.data)
                        })
                    }
                    break;

                default:
                    break;
            }

            
        },
        getCatalogoActividades(){
             axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/actividades')
            .then((response)=>{
                        this.actividades=response.data.actividades;
                        // console.log(this.actividades);                       
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },

        buscarVecino(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'persona/dpi/'+this.persona.dpi)
            .then((response)=>{
                        this.vecino=response.data.persona;
                        this.seguimientoVecinosSatisfechos.persona_id = this.vecino.id
                        this.getPromotor()
                        
                   })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 

        },
         getPromotor(){
                axios.get(process.env.VUE_APP_SERVICE_URL+'user/promotor/'+this.vecino.zona_id)
                .then((response)=>{
                        this.promotor=response.data.user;
                        // console.log(this.promotor);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },

        limpiar(){
            this.seguimientoVecinosSatisfechos={
                "persona_id":"",
                "fecha":"",
                "actividad_id":"",
                "descripcion":"",
                "responsable":""
                }
            this.vecino={
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "dpi": null,
                "celular": null,
                "id": null,
                "liderazgo": "",
                "zona_id": null,
                "seguimiento": null 
            }
            this.persona.dpi=""
        }


    }
}
</script>

