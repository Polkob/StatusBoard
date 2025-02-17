<template>
  <v-app>
    <v-container height="100%" margin-right="0px" width="1200px">
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-app-bar color="primary">
              <v-app-bar-nav-icon
                variant="text"
                @click.stop="drawer = !drawer"
              ></v-app-bar-nav-icon>

              <v-spacer></v-spacer>

              <v-btn icon @click="showSearch = !showSearch">
                <v-icon>{{ showSearch ? "mdi-close" : "mdi-magnify" }}</v-icon>
              </v-btn>

              <v-text-field
                class="mr-4"
                max-width="300"
                variant="solo"
                hide-details
                single-line
                v-if="showSearch"
                v-model="searchQuery"
                label="Поиск"
                clearable
              ></v-text-field>
            </v-app-bar>
          </v-col>

          <v-navigation-drawer
            v-model="drawer"
            permanent
            :width="300"
            :location="$vuetify.display.mobile ? 'left' : undefined"
            temporary
          >
            <v-list v-model:opened="open">
              <v-list-group value="Profile">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-account-multiple-outline"
                    title="Профили"
                  ></v-list-item>
                </template>

                <v-list>
                  <v-list-item
                    v-for="([title, value, icon], i) in items"
                    :key="i"
                    :prepend-icon="icon"
                    :value="value"
                  >
                    <template v-slot:default="{ items }">
                      <router-link :to="{ name: value }" class="router-link">
                        {{ title }}
                      </router-link>
                    </template>
                  </v-list-item>
                </v-list>
              </v-list-group>
            </v-list>
          </v-navigation-drawer>

          <v-col cols="12" class="mt-9">
            <router-view :data="filteredData" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    open: ["Profile"],
    drawer: true,
    showSearch: false,
    searchQuery: "",
    items: [
      ["Все", "all", "mdi-check-circle"],
      ["Обработанные", "processed", "mdi-check-circle"],
      ["Не обработанные", "no_processed", "mdi-alert-circle"],
    ],
    headers: [
      { title: "Status", key: "status" },
      { title: "Имя", key: "firstName" },
      { title: "Фамилия", key: "lastName" },
      { title: "Компания", key: "company" },
      { title: "Специальность", key: "jobTitle" },
      { title: "Телефон", key: "phone" },
      { title: "E-mail", key: "email" },
      { title: "Интересы", key: "interests" },
    ],
    data: [],
  }),
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => {
        return (
          (item.firstName &&
            item.firstName
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (item.lastName &&
            item.lastName
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (item.email &&
            item.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (item.phone && item.phone.includes(this.searchQuery)) ||
          (item.company &&
            item.company
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (item.jobTitle &&
            item.jobTitle
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (item.interests &&
            item.interests
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
        );
      });
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("https://retoolapi.dev/D6xLg4/data");
        this.data = response.data;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: black;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
