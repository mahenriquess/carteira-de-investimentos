<template>
    <div>
        <v-row>
            <v-col v-for="carteira in carteiras" :key="carteira.id">
                <Carteira :carteira="carteira" /> 
            </v-col>
        </v-row>
    </div>
</template>

<script>

import Carteira from './../components/Carteira';

export default {
    components:{Carteira},
    data() {
        return {
            carteiras: [
                {id: 1 ,title: 'Carteira 1', preco:105.30},
                {id: 2, title: 'Carteira 2', preco:2000.75},
            ]
        }
    }
}
</script>

<style>

</style>