<template>
  <!-- <div>
    <v-text @click="$route.go(-1)">Voltar</v-text>
    <v-subheader>Você tem R$ {{valorDisponivel}} restantes para distribuir em seus ativos.</v-subheader>
  </div> -->
  <div>
    <v-app-bar
      color="primary"
      dark
    >
      <v-btn text icon color="white" @click="$store.dispatch('toggleDrawer')">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

    
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:['title'],
  methods: {

  }
}
</script>

<style>

</style>