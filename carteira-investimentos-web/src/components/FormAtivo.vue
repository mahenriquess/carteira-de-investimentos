<template>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="tipos"
              label="Tipo de Ativo"
              v-model="ativo.tipo"
            ></v-select>
            <!-- <v-text-field v-model="ativo.tipo" label="Tipo Ativo" required></v-text-field> -->
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field  v-model="ativo.valorCompra" prefix="R$" label="Valor investido" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="ativo.codigoEmpresa" v-on:blur="popularEmpresa" label="Código da empresa"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field :loading="loadingEmpresa" v-model="empresa.preco" disabled label="Valor Atual da ação"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field :loading="loadingEmpresa" v-model="empresa.nome" disabled label="Nome da empresa"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field  :loading="loadingEmpresa" v-model="empresa.moeda" disabled label="Tipo de moeda"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
</template>

<script>
import client from '../configs/client';

export default {
  data() {
    return {
        ativo: {
            tipo: "",
            valorCompra: 0,
            codigoEmpresa: '',
        },
        empresa: {},
        tipos: [
          'Bolsa de valores'
        ],
        loadingEmpresa:false
    }
  },
  props: ['carteira'],
  methods: {
    async popularEmpresa() {
      if(this.ativo.codigoEmpresa && this.ativo.codigoEmpresa != this.empresa.simbolo){
        this.loadingEmpresa = true;
        try{
          const {data} = await client.get(`/stock-price/${this.ativo.codigoEmpresa}`);
          if(data){
            this.empresa = data;
          }else{
            this.empresa = {};
          }
        }catch(err){
          this.empresa = {}
        }finally{
          this.loadingEmpresa = false;
        }
      }
    },
    getDataForm() {
      const ativo = { ...this.ativo };
      if(ativo.valorCompra){
        ativo.valorCompra = ativo.valorCompra * this.empresa.preco;
      }
      return ativo;
    },

    getErrors() {
      const errors = [];

      if(this.carteira.valor < this.ativo.valorCompra){
        errors.push('O valor deve ser igual ou inferior ao seu saldo disponível na carteira.');
      }

      if(!this.empresa.nome){
        errors.push('A empresa deve ser relacionada ao seu ativo.');
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