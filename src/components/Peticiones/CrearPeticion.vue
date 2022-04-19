<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-1 font-weight-bold text-left">Ingreso de Peticiones</h1>
            </v-col>
        </v-row>
                
                <v-row>
                    <v-col class="mb-4">
                        <v-text-field v-model="persona.dpi"
                        label="Ingrese DPI del Vecino o número de celular"
                        :rules="Rules" 
                        required
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
                <v-spacer></v-spacer>
                <v-banner
                elevation="9"
                outlined
                rounded
                class="indigo darken-4 white--text"
                >
                <v-icon class="white">mdi-notebook-edit</v-icon>
                    Petición
                </v-banner>
                <br>
                <v-form 
                    ref="form"
                    v-model="valid"
                    @submit.prevent="guardarPeticion">
                    <v-row>
                        <v-col>
                            <v-text-field v-model="peticion.fecha" 
                                label="Fecha de solicitud"
                                type="date"
                                day-format
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-text-field>

                            
                            <v-select v-model="peticion.canal"
                                :items="canales"
                                item-text="canal"
                                item-value='canal'
                                label="Medio de comunicación"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-select>

                            <v-textarea v-model="peticion.descripcion" 
                                    label="Descripcion"
                                    outlined
                                    color="#10069f"
                                    :rules="Rules"
                                    required
                            ></v-textarea>

                            <v-text-field v-model="peticion.oficio" 
                                    label="Oficio"
                                    outlined
                                    color="#10069f"
                            ></v-text-field>
                            <v-select v-model="peticion.peticion_id"
                                :items="tipoPeticion"
                                item-text="peticion"
                                item-value='id'
                                label="Petición de tipo"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-select>
                        </v-col>

                        <v-col>
                            <v-text-field v-model="peticion.direccion" 
                                label="Dirección"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-text-field>

                            <v-select v-model="peticion.zona"
                                :items="zona"
                                item-text="zona"
                                item-value="id"
                                label="Zona"
                                outlined
                                color="#10069f"
                                @change="getDistrito(), getSector(), getColoniaByZona(), getPromotor();"
                                :rules="Rules"
                                required
                            ></v-select>

                            
                            <v-select v-model="peticion.distrito"
                            :items="distrito"
                            item-text="distrito"
                            item-value='distrito_id'
                            label="Distrito"
                            outlined
                            color="#10069f"
                            @change="getColoniaByDistrito()"
                            v-if="validaDistrito=='s'"
                            :rules="Rules"
                            required
                            ></v-select>

                            <v-select v-model="peticion.sector"
                            :items="sector"
                            item-text="sector"
                            item-value='id'
                            label="Sector"
                            outlined
                            color="#10069f"
                            @change="getColoniaBySector()"
                            v-if="validaSector=='s'"
                            :rules="Rules"
                            required
                            ></v-select>

                            <v-select v-model="peticion.colonia"
                                :items="colonia"
                                item-text="colonia"
                                item-value='id'
                                label="Colonia"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-select>
                            <v-select v-model="peticion.usuario_id"
                                :items="promotor"
                                item-text="promotor"
                                item-value='id'
                                label="Promotor asignado"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-select>
                            <v-select v-model="peticion.dependencia_id"
                                :items="dependencia"
                                item-text="dependencia"
                                item-value='id'
                                label="Dependencia correspondiente"
                                outlined
                                color="#10069f"
                                :rules="Rules"
                                required
                            ></v-select>
                        </v-col> 
                    </v-row>
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
                </v-form>       
               
    </v-container>
</template>



<script>
import axios from 'axios'
export default {
    name:'crearPeticion',
    mounted(){
        this.getZona();
        this.getCanales();   
        this.getDependencia();
        this.getTipoPeticion(); 
          
    },
    data:()=>({ 
            valid: true,
             Rules: [
                v => !!v || 'Campo requerido',
            ],
            step: 1,            
            peticion:{
                "fecha": "",
                "canal": "",
                "descripcion": "",
                "direccion": "",
                "zona": null,
                "distrito": null,
                "sector": null,
                "colonia":"",
                "oficio": "",
                "estatus": "Ingresado",
                "usuario_id":"",
                "persona_id":null,
                "dependencia_id":"",
                "peticion_id":"",
                "usuario_creador":JSON.parse(localStorage.getItem('username'))
            },
            canales:[],
            vecino:[],
            alcaldia:[],
            zona:[],
            distrito:[],
            sector:[],
            colonia:[],
            validaDistrito:[],
            validaSector:[],
            persona:[],
            promotor:[],
            dependencia:[],
            tipoPeticion:[]
        
    }),
    methods:{

        getCanales(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/canales')
                .then((response)=>{
                    this.canales=response.data.canales;
                    // console.log(this.canales);
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
        },

        getZona(){
            
            if (JSON.parse(localStorage.getItem('rol'))===4){
                axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/zonas')
                .then((response)=>{
                    this.zona=response.data.zonas;
                    this.validaDistrito=response.data.distrito;
                    this.validaSector=response.data.sector;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
            }else{
                axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/zonaalcaldia/'+JSON.parse(localStorage.getItem('alcaldia')))
                .then((response)=>{
                    this.zona=response.data.zona;
                    this.validaDistrito=response.data.distrito;
                    this.validaSector=response.data.sector;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })
            }
        },

        getDistrito(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/distritos/'+this.peticion.zona)
                .then((response)=>{
                        this.distrito=response.data.distritos;
                        // console.log(this.distrito);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    })
        },

        getSector(){

            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/sectores/'+this.peticion.zona)
                .then((response)=>{
                        this.sector=response.data.sectores;
                        // console.log(this.sector);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    })
        },
        getColoniaByDistrito(){
           
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/coloniaspordistrito/'+ this.peticion.distrito +'/'+this.peticion.zona)
                .then((response)=>{
                        this.colonia=response.data.colonias;
                        // console.log(this.colonia);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    })              
        },
        getColoniaBySector(){
                axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/coloniasporsector/'+ this.peticion.sector +'/'+this.peticion.zona)
                .then((response)=>{
                        this.colonia=response.data.colonias;
                        // console.log(this.colonia);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },
        getColoniaByZona(){
                 axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/coloniasporzona/'+ this.peticion.zona)
                .then((response)=>{
                        this.colonia=response.data.colonias;
                        // console.log(this.colonia);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },

        getPromotor(){
                axios.get(process.env.VUE_APP_SERVICE_URL+'user/promotor/'+this.peticion.zona)
                .then((response)=>{
                        this.promotor=response.data.user;
                        // console.log(this.promotor);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },
        getDependencia(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/dependencia')
                .then((response)=>{
                        this.dependencia=response.data.dependencia;
                        // console.log(this.promotor);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 
        },
        getTipoPeticion(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'catalogo/peticiones')
                .then((response)=>{
                        this.tipoPeticion=response.data.peticion;
                        // console.log(this.promotor);
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 

        },
        guardarPeticion(){
             this.$refs.form.validate()
            if(this.valid){
             axios.post(process.env.VUE_APP_SERVICE_URL+'gestion/register', this.peticion)
            .then((response)=>{

                this.$swal({
                    title:"Petición registrada con éxito",
                    text:"Petición número: "+response.data.last_insert_id.id,
                    icon:"success"

                }).then((result)=>{
                    if(result.isConfirmed){
                            this.limpiar()
                    }
                })

            })
            .catch(function(error){
            console.log(error.response.data)
            })
        }

        },

        buscarVecino(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'persona/dpi/'+this.persona.dpi)
            .then((response)=>{
                        this.vecino=response.data.persona;
                        this.peticion.persona_id=response.data.persona.id; //asigna el id del vecino a la variable persona_id del array peticion
                    })
                    .catch(function(error){
                    console.log(error.response.data);
                    }) 

        },

        limpiar(){
            this.peticion={
                "fecha": "",
                "canal": "",
                "descripcion": "",
                "direccion": "",
                "zona": "",
                "distrito": null,
                "sector": null,
                "colonia":"",
                "oficio": "",
                "estatus": "Ingresado",
                "usuario_id":"",
                "persona_id":null,
                "usuario_creador":JSON.parse(localStorage.getItem('username'))
            }
            this.persona={
                "dpi":""
            }
            this.vecino={
                "nombre":"",
                "apellido":"",
                "dpi":"",
                "direccion":"",
                "celular":""

            }
        }


    }
}
</script>

