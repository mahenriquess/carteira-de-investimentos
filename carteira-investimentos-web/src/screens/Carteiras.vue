<template>
    <div>
        <v-row justify="center">
            <template v-for="(carteira, index) in $store.getters.carteiras">
                <v-col :key="carteira.id">
                    <Carteira :carteira="carteira" /> 
                </v-col>
            <v-responsive
                v-if="++index%2 === 0 && index+1 > 1"
                :key="`width-${index}`"
                width="100%"
            ></v-responsive>
            </template> 
            
        </v-row>
        <v-btn
            color="pink"
            fab
            dark
            large
            absolute
            bottom
            right
            class="v-btn--example"
            @click="formCarteira"
            >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Nova Carteira</span>
                </v-card-title>
                    <FormCarteira ref="formCarteira" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="saveCarteira">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import Carteira from './../components/Carteira';
import FormCarteira from './../components/FormCarteira';

export default {
    components:{Carteira,FormCarteira},
    data() {
        return {
            carteiras: [
                {id: 1 ,title: 'Carteira 1', preco:105.30},
                {id: 2, title: 'Carteira 2', preco:2000.75},
            ],
            dialog:false
        }
    },
    methods: {
        formCarteira() {
            this.dialog=true;
        },
        async saveCarteira() {
            this.dialog=false;

            const {nome, valor} = this.$refs.formCarteira.getDataForm();
            
                
                try {
                    await this.$store.dispatch('addCarteira',{nome, valor});
                    
                }catch(e) {
                    console.warn(e);
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