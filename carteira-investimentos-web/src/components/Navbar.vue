<template>
    <div>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase mr-4">
                <span class="font-weight-light">Carteira de Investimentos</span>
            </v-toolbar-title>
            <v-progress-linear :active="$store.getters.loading" indeterminate absolute bottom color="deep-purple accent-4" ></v-progress-linear>
            
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text to="/cadastro" v-if="!usuarioIsLogged">Cadastro</v-btn>
                <v-btn text to="/login" v-if="!usuarioIsLogged">Login</v-btn>

                <v-menu offset-y v-if="usuarioIsLogged">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary"  dark v-on="on" >
                            {{$store.getters.usuario.nome}}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item >
                            <v-list-item-title @click="deslogar">Deslogar</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
    </div>
   
</template>

<script>
import Loading from './Loading';

export default {
    components: {
		Loading,
	},
    name: 'Navbar',
    props: [
        'usuarioIsLogged'
    ],
    methods: {
        deslogar() {
            this.$store.dispatch('logout');
        },
        router(route) {
            console.log(route);
            this.$router.push(route);
        }
    }
}
</script>

<style>

</style>