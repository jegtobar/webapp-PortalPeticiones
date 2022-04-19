<template>
    <v-container>
        <v-row class="text-left">
            <v-col class="mb-4">
                <h1 class="display-1 font-weight-bold mb-3">Creación de Usuario</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarUsuario()">
                    <v-text-field v-model="usuario.nombres" 
                        label="Nombres"
                        outlined
                        required
                    ></v-text-field>

                    <v-text-field v-model="usuario.apellidos" 
                        label="Apellidos"
                        outlined
                        required
                    ></v-text-field>

                    <v-text-field v-model="usuario.username" 
                        label="Usuario"
                        outlined
                        required
                    ></v-text-field>

                    <v-text-field v-model="usuario.password" 
                        label="Contraseña"
                        outlined
                        type="password"
                        required
                    ></v-text-field>

                    <v-text-field v-model="usuario.nit" 
                        label="NIT"
                        outlined
                        required
                    ></v-text-field>

                    <v-text-field v-model="usuario.dpi" 
                        label="DPI"
                        type="number"
                        outlined
                        required
                    ></v-text-field>
                    
                    <v-select v-model="usuario.alcaldia_id"
                    :items="alcaldias"
                    item-text="alcaldia"
                    item-value='id'
                    label="Alcaldia"
                    outlined
                    ></v-select>

                    <v-select v-model="usuario.rol_id"
                    :items="roles"
                    item-text="rol"
                    item-value='id'
                    label="Rol de usuario"
                    outlined
                    ></v-select>
        
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>
                    </v-card-actions>

                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name:'crearUsuario',
    mounted(){
        this.getAlcaldias();
        this.getRoles();

    },
    data(){
        return{
            usuario:{
                "rol_id": "",
                "alcaldia_id": "",
                "distrito_id": null,
                "sector_id": null,
                "nombres": "",
                "apellidos": "",
                "username": "",
                "password":"",
                "nit": "",
                "dpi": "",
                "usuario_creador":"jtobar"
            },
            alcaldias:[],
            roles:[]
        }

    },
    methods:{
        guardarUsuario(){
            var router = this.$router;
            axios.post('http://localhost:8000/v1/user/register', this.usuario)
            .then(function(){
                router.push('/usuarios');
            })
            .catch(function(error){
            console.log(error.response.data)
            })
        
        },

        getAlcaldias(){
            axios.get('http://localhost:8000/v1/catalogo/alcaldias')
                .then((response)=>{
                    this.alcaldias=response.data.alcaldias;
                    console.log(this.alcaldias);
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        },

        getRoles(){
            axios.get('http://localhost:8000/v1/catalogo/roles')
                .then((response)=>{
                    this.roles=response.data.roles;
                    console.log(this.roles);
                })
                .catch(function(error){
                   console.log(error.response.data);
                })

        }

    }
}
</script>

