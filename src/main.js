import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from './router/routing';
import * as components from 'vuetify/components'
import * as styles from 'vuetify/styles'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue'

const vuetify = createVuetify({
  components,
  styles,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.darken3, 
          secondary: colors.red.darken2, 
        }
      },
    },
  },
})

createApp(App).use(vuetify).use(router).mount('#app')
