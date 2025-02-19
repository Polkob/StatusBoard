import { createApp } from 'vue'
import { createStore } from 'vuex';
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

const store = createStore({
  state: {
    selectedItem: null,
    items: [], 
  },
  mutations: {
    SET_SELECTED_ITEM(state, item) {
      state.selectedItem = item;
    },
    ADD_ITEM(state, item) {
      state.items.push(item);
    },
    REMOVE_ITEM(state, itemId) {
      state.items = state.items.filter(item => item.id !== itemId);
    },
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    },
  },
  actions: {
    selectItem({ commit }, item) {
      commit('SET_SELECTED_ITEM', item);
    },
    async addItem({ commit }, item) {
      try{
      const url = "https://api-generator.retool.com/DLcnga/data";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) throw new Error("Ошибка при добавлении");
      commit('ADD_ITEM', item); 
      } catch (error) {
      console.error(error);
      }
    },
    async updateItem({ commit }, item) {
      try{
      const url = `https://api-generator.retool.com/DLcnga/data/${item.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) throw new Error("Ошибка при обновлении");
      commit('UPDATE_ITEM', item); 
      } catch(error) {
        console.error(error);
      }
    },
    async removeItem({ commit }, itemId) {
      try{
      const url = `https://api-generator.retool.com/DLcnga/data/${itemId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Ошибка при удалении");
      commit('REMOVE_ITEM', itemId); 
    } catch(error) {
      console.error(error);
    }
    },
  },
  getters: {
    allItems: (state) => state.items,
    getSelectedItem: (state) => state.selectedItem,
  },
});

createApp(App).use(vuetify).use(router).use(store).mount('#app')
