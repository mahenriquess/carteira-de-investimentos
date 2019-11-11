<template>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="carteira.nome" label="Nome da carteira" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="carteira.valor" label="Valor da carteira" hint="example of helper text only on focus"></v-text-field>
          </v-col>
          
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
      
</template>

<script>
export default {
  data() {
    return {
      carteira: {
          nome: "",
          valor: 0,
      },
    }
  },
  methods: {
    getDataForm() {
      return this.carteira;
    }
  }
}
</script>

<style>

</style>