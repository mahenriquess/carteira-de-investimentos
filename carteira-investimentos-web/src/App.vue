<template>
	<v-app>
		<div v-if="!usuarioIsLogged" class="wallpaper"></div>
		<Navbar v-if="usuarioIsLogged" :usuarioIsLogged="usuarioIsLogged"/>
		
		<v-content v-bind:class="{'disabled':($store.getters.loading && usuarioIsLogged)}">
  				<transition 
				  	name="fade" mode="out-in">

					<router-view></router-view>
				</transition>

		</v-content>
	</v-app>
</template>

<script>

import Navbar from './components/Navbar';
import Drawer from './components/Drawer';
import Loading from './components/Loading';

export default {
	components: {
		Loading,
		Navbar,
		Drawer
	},
	created() {
		this.$store.dispatch('atualizaUsuarioLogado');
		if(this.usuarioIsLogged) {
			setTimeout(() => {
				console.log('loadCarteiras')
				this.$store.dispatch('loadCarteiras');
			},500)
		}
		
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
