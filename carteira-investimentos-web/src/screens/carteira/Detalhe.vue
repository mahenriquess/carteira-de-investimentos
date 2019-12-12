<template>
    <div>
       <HeaderCarteira />
        <v-row justify="center">
            <template v-for="(ativo) in carteira.ativos">
                <v-col :key="ativo.id">
                    <Carteira :ativo="ativo" /> 
                </v-col>
            </template> 
            <v-col>
                <EmptyCard :onClick="openModalAddAtivo" />
            </v-col>
        </v-row>

        <v-dialog v-model="addAtivo" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Novo Ativo</span>
                </v-card-title>
                    <FormAtivo ref="formAtivo" :carteira="carteira"/>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="addAtivo = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" :disabled="!addAtivo || saving" text @click="saveAtivo">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    
</template>

<script>

import HeaderCarteira from '../../components/HeaderCarteira';
import EmptyCard from '../../components/EmptyCard';
import FormAtivo from '../../components/FormAtivo';

export default {
    components:{HeaderCarteira,EmptyCard,FormAtivo},
    mounted() {
        console.log(this.$route.params.carteiraId);
        this.carteira = this.$store.getters.carteiras.find(carteira => {
            console.log(carteira.id);
            return carteira.id == this.$route.params.carteiraId
        })
        console.log(this.carteira);
    },
    data() {
        return {
            carteira:{},
            addAtivo:false,
            saving: false,
        }
    },
    methods: {
        openModalAddAtivo() {
            this.addAtivo = true;
        }, 

        async saveAtivo() {

            const {errors, hasError} = this.$refs.formAtivo.getErrors();
            if(hasError){
                console.log(errors);
                let msg = "";
                errors.forEach(error => msg += error);
                alert(msg);
                return;
            }
            
            const ativo = this.$refs.formAtivo.getDataForm();

            this.dialog=false;
            this.$refs.formAtivo.clearFields();
            try {
                this.saving = true;
                await this.$store.dispatch('addAtivo',{ativo,idCarteira: this.$route.params.carteiraId});
            }catch(e) {
                console.warn(e);
            }finally{
                this.saving = false;
            }
        }
    }
}
</script>

<style>
.v-btn--example {
    margin: 20px 20px 50px 50px;
  }
</style>