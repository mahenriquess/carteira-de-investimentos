<template>
	<div>
		<Navbar :usuarioIsLogged="usuarioIsLogged"/>
		<b-container id="app">
			<router-view></router-view>
		</b-container>
	</div>
</template>

<script>

import Navbar from './components/Navbar';
import client from './configs/client';

client.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default {
	created() {
		this.$store.dispatch('atualizaUsuarioLogado');
	},
	computed:{
		usuarioIsLogged() {
			return this.$store.getters.usuarioIsLogged;
		}
		
	},
    components: { Navbar },
	name: 'app',
    methods: {

    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
