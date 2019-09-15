<template>
	<div>
		<Navbar v-bind:nomeUsuarioLogado="nomeUsuarioLogado" v-bind:userIsLogged="userIsLogged" />
		<b-container id="app">
			<router-view></router-view>
		</b-container>
	</div>
</template>

<script>

import Navbar from './components/Navbar';
import client from './configs/client';
import usuarioHelper from './helpers/usuarioHelper';

client.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default {
	created() {
		this.updateUsuarioLogado();
	},
    components: { Navbar },
	name: 'app',
	data() {
		return {
			nomeUsuarioLogado: '',
			userIsLogged: false,
		}
	},
    methods: {
        getCookies() {
            return this.$cookies.get('usuario');
		},
		updateUsuarioLogado() {
			if(usuarioHelper.isLogged()){
				const usuario = this.getCookies();
				this.nomeUsuarioLogado = usuario.nome;
				this.userIsLogged = true;
			}else{
				this.nomeUsuarioLogado = "";
				this.userIsLogged = false;
			}
		}
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
