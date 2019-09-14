<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
            <b-nav-item href="#">Home</b-nav-item>

            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            
            <b-nav-item-dropdown v-if="!userIsLogged" text="User" right>
                <b-dropdown-item href="#">Account</b-dropdown-item>
                <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-if="userIsLogged" :text="nomeUsuarioLogado" right>
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
        'nomeUsuarioLogado',
        'userIsLogged',
    ],
    methods: {
        deslogar() {
            this.$cookies.remove('usuario');
            this.$parent.updateUsuarioLogado();
        }
    }
}
</script>

<style>

</style>