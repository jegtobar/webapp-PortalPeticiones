<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item class="px-2">
          <v-avatar>
            <img :src="avatarData" />
          </v-avatar>
        </v-list-item>
        <v-list-item-title class="text-h6">
          {{ userData.nombre }}
        </v-list-item-title>
        <v-list-item-title class="text-h6">
          {{ userData.apellido }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ userData.alcaldia }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{ userData.rol }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  computed: {
    userData: function () {
      let data = {
        nombre: JSON.parse(localStorage.getItem("nombres")),
        apellido: JSON.parse(localStorage.getItem("apellidos")),
        alcaldia: JSON.parse(localStorage.getItem("user_alcaldia")),
        rol: JSON.parse(localStorage.getItem("user_rol")),
      };
      return data;
    },

    avatarData: function () {
      return JSON.parse(localStorage.getItem("avatar"));
    },
  },
};
</script>
