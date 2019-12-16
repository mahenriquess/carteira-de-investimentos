<template>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="carteira.nome" label="Nome da carteira" hint="Dê um nome fácil de identificá-la!" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="carteira.valor" label="Valor da carteira" hint="Utilize este valor para simular seus investimentos! "></v-text-field>
          </v-col>
          
        </v-row>
      </v-container>
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
    },

    getErrors() {
      const errors = [];

      console.log(this.carteira.nome.length);
      if(this.carteira.nome.length <= 5){
        errors.push('A carteira deve conter mais de 5 caracteres')
      }

      if(this.carteira.valor < 300){
        errors.push('O valor minimo a ser registrado deve ser 300 reais')
      }

      return {errors, hasError: errors.length > 0};
    },

    clearFields() {
      this.carteira = {
        nome: '',
        valor: 0
      }
    }

  }
}
</script>

<style>

</style>