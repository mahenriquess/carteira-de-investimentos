<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
            <b-nav-item @click="router('/')">Home</b-nav-item>
            <b-nav-item v-if="!usuarioIsLogged" @click="router('/cadastro')">Cadastro</b-nav-item>
            
            <!-- <b-nav-item-dropdown v-if="!userIsLogged" text="User" right>
                <b-dropdown-item href="#">Account</b-dropdown-item>
                <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown> -->

            <b-nav-item-dropdown v-if="usuarioIsLogged" :text="$store.getters.usuario.nome" right>
                <b-dropdown-item @click="deslogar">Deslogar</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
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