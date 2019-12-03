<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >

  <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{$store.getters.usuario.nome}}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.to"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn  @click="deslogar" block>Logout</v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>


export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
    inputValue:true,
    links: [
        
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/carteiras',
        icon: 'fa-wallet',
        text: 'Carteiras'
      }
    ]
    }
    
  },
  methods: {
      deslogar() {
          this.$store.dispatch('logout');
      },
      router(route) {
          console.log(route);
          this.$router.push(route);
      }
  }
//   computed: {
//     ...mapState('app', ['image', 'color']),
//     inputValue: {
//       get () {
//         return this.$store.state.app.drawer
//       },
//       set (val) {
//         this.setDrawer(val)
//       }
//     },
//     items () {
//       return this.$t('Layout.View.items')
//     }
//   },

//   methods: {
//     ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
//   }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>
