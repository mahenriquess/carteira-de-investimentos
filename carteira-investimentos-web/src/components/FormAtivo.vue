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
            <v-text-field  v-model="ativo.qtdAcoes" label="Quantidade de ações" required></v-text-field>
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
          <v-col cols="12" sm="12" md="12">
            <v-text-field :rules="rules" v-model="valorFinalCompra" disabled prefix="R$" label="Valor Final da Compra"></v-text-field>
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
          qtdAcoes: 0,
          codigoEmpresa: '',
      },
      empresa: {},
      tipos: [
        'Bolsa de valores'
      ],
      loadingEmpresa:false,
      rules: [
        value => {
          console.log(this.valorFinalCompra,this.carteira.valor);
          return this.valorFinalAcceptable || 'O valor final excede o valor disponível em sua carteira';
        }
      ]
    }
  },
  computed: {
    valorFinalAcceptable() {
      if(!this.valorFinalCompra){
        return true;
      }
      return parseFloat(this.valorFinalCompra) <= parseFloat(this.carteira.valor)
    },
    valorFinalCompra() {
      if(!this.ativo.qtdAcoes || !this.empresa || !this.empresa.preco){
        return "";
      }
      return (parseFloat(this.ativo.qtdAcoes) * parseFloat(this.empresa.preco)).toFixed(2);
    }
  },
  props: ['carteira'],
  methods: {
    async popularEmpresa() {
      if(this.ativo.codigoEmpresa && this.ativo.codigoEmpresa != this.empresa.simbolo){
        this.loadingEmpresa = true;
        try{
          const {data} = await client.get(`/stock-price/${this.ativo.codigoEmpresa}`);
          console.log(data);
          if(data){
            this.empresa = data;
          } else { 
            dataCron = await client.get(`/stock-price-cron/${this.ativo.codigoEmpresa}`)
            if(dataCron) {
              this.empresa = dataCron;
            } else 
              this.empresa = {};
          }
        }catch(err){
          console.log("Erro ao tentar popular dados da empresa. ");
          this.empresa = {}
        }finally{
          this.loadingEmpresa = false;
        }
      }
    },
    getDataForm() {
      const ativo = { ...this.ativo, valorMoedaCompra: this.empresa.preco, tipoMoeda: this.empresa.moeda };
      
      ativo.valorCompra = ativo.qtdAcoes * this.empresa.preco;
      
      return ativo;
    },

    getErrors() {
      const errors = [];

      if(!this.ativo.qtdAcoes){
        errors.push('Preencha a quantidade de ações e serem investidas');
      }
      if(!this.valorFinalAcceptable) {
        errors.push('O valor deve ser igual ou inferior ao seu saldo disponível na carteira.');
      }

      if(!this.empresa.nome){
        errors.push('A empresa deve ser relacionada ao seu ativo.');
      }

      return {errors, hasError: errors.length > 0};
    },

    clearFields() {
      this.ativo = {
        tipo: "",
        valorCompra: 0,
        codigoEmpresa: '',
      };
      this.empresa = {};
    }

  }
}
</script>

<style>

</style>