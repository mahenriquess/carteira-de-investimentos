import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#2980b9',
        error: '#c0392b',
      },
    },
  },
});
