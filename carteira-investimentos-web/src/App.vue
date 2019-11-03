<template>
	<!-- <v-app>
		<Navbar :usuarioIsLogged="usuarioIsLogged"/>
		<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app> -->
		
		<!-- <b-container id="app">
			
		</b-container> -->
	<v-app>
		<div v-if="!usuarioIsLogged" class="wallpaper"></div>
		<Navbar v-if="usuarioIsLogged" :usuarioIsLogged="usuarioIsLogged"/>
		<!-- <Drawer /> -->
		
		<v-content v-bind:class="{'disabled':($store.getters.loading && usuarioIsLogged)}">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>

import Navbar from './components/Navbar';
import Drawer from './components/Drawer';
import Loading from './components/Loading';

import client from './configs/client';

client.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default {
	components: {
		Loading,
		Navbar,
		Drawer
	},
	created() {
		this.$store.dispatch('atualizaUsuarioLogado');
	},
	computed:{
		usuarioIsLogged() {
			return this.$store.getters.usuarioIsLogged;
		}
		
	},
	name: 'app',
    methods: {

    }
}
</script>

<style>
.disabled {
    pointer-events: none;
    opacity: 0.4;
}
.wallpaper{
	-webkit-filter: blur(5px);

	position:absolute;
	height: 100vh;
	width: 100vw;
	background-image: url('./assets/img/wallpaper_login.jpg');
	background-size: cover;
}


</style>
