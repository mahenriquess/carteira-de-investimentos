<template>
  <!-- <div>
    <v-text @click="$route.go(-1)">Voltar</v-text>
    <v-subheader>Você tem R$ {{valorDisponivel}} restantes para distribuir em seus ativos.</v-subheader>
  </div> -->
  <div>
    <v-app-bar
      :color="colorBar"
      dark
    >
      <v-btn text icon color="white" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Você tem R$ {{valorDisponivel}} restantes para distribuir em seus ativos.</v-toolbar-title>

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
  props:['valorDisponivel','colorBar'],
  
  methods: {

  }
}
</script>

<style>

</style>