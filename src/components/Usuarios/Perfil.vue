<template>
    <v-container>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                    <v-banner
                    elevation="9"
                    outlined
                    rounded
                    class="indigo darken-4 white--text"
                >
                    <v-icon class="white">mdi-account-cog</v-icon>
                        Editar usuario
                    </v-banner>
                    <v-spacer></v-spacer>
                    </v-col>
                </v-row>
                <v-form
                ref="form"
               
                @submit.prevent="guardar">
                    <v-row>
                        <v-col>
                            <v-card
                                
                                class="mx-auto my-12"
                                max-width="374"
                            >
                                <template slot="progress">
                                <v-progress-linear
                                    color="deep-purple"
                                    height="10"
                                    indeterminate
                                ></v-progress-linear>
                                </template>

                                <v-img
                                contain
                                height="250"
                                :src="editedItem.avatar"
                                ></v-img>
                                <v-divider class="mx-4"></v-divider>
                                <v-card-actions>
                                    <v-file-input
                                    v-model="avatar"
                                    :rules="rulesImg"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Cambiar avatar"
                                    prepend-icon="mdi-camera"
                                    label="Avatar"
                                ></v-file-input>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col
                        >
                            <v-text-field
                            v-model="editedItem.nombres"
                            label="Nombres"
                            ></v-text-field>

                            <v-text-field
                            v-model="editedItem.apellidos"
                            label="Apellidos"
                            ></v-text-field>
                
                            <v-text-field
                            v-model="editedItem.password"
                            label="Cambiar contraseña"
                            :type="showPassword ?'text':'password'"
                            :append-icon="showPassword?'mdi-eye-off':'mdi-eye'"
                            @click:append="showPassword=!showPassword"
                            :rules="rules"
                            ></v-text-field>

                            <v-text-field
                            v-model="match"
                            label="Confirmar contraseña"
                            :type="showPassword ?'text':'password'"
                            :append-icon="showPassword?'mdi-eye-off':'mdi-eye'"
                            @click:append="showPassword=!showPassword"
                            ></v-text-field>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                type="submit"
                            >
                                Guardar
                            </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card-text>
    </v-container>
</template>
<script>
import axios from 'axios'

export default ({
    mounted() {
        this.getUsuario()
    },

    data:()=>({ 
          match: '',
          validate:true,
          showPassword:false,
          avatar:null,
          editedItem: {
                "id":"",
                "nombres":"",
                "apellidos":"",
                "password":""
            },

            rulesImg: [
                value => !value || value.size < 2000000 || 'Avatar debe ser menor a 2 MB',
            ],
    }),
    computed: {
      rules () {
        const rules = []
        if (this.match) {
          const rule =
            v => (!!v && v) === this.match || 'La contraseña no concuerda con la confirmación'
          rules.push(rule)
        }

        return rules
      },
    },

    watch: {
      match: 'validateField',

    },
    methods: {
        getUsuario(){
            axios.get(process.env.VUE_APP_SERVICE_URL+'user/editUser/'+JSON.parse(localStorage.getItem('user_id')))
                .then((response)=>{
                    this.editedItem=response.data;
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        },
        guardar(){
            
        this.$refs.form.validate()
        if(this.validate){
            let formData = new FormData()
            formData.append('file',this.avatar)
            formData.append('data',JSON.stringify(this.editedItem))
             axios.post(process.env.VUE_APP_SERVICE_URL+'user/editar', formData)
                .then(
                    this.$swal({
                        title:"Editar Perfil",
                        text:"Información actualizada con éxito",
                        icon:"success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            this.getUsuario();
                            this.match=""

                        }
                    })
                )
                .catch(function(error){
                console.log(error.response.data)
                })
            }
        },
        

        validateField () {
        this.$refs.form.validate()
      },       
},



})
</script>
