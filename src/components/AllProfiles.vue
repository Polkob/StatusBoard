<template>
  <v-card class="border-none">
    <v-row class="center">
      <v-col cols="9" class="text-left">
        <h2 class="ml-4">Все</h2> 
      </v-col>
      <v-col cols="3" class="text-right">
        <Select :actions="['Добавить', 'Изменить', 'Удалить']"></Select>
      </v-col>
    </v-row>

    <v-data-table
      :width="800"
      height="530"
      class="elevation-3 mt-5"
      density="compact"
      fixed-header
      :headers="headers"
      :items="filteredData"
      :items-per-page="5"
    >
      <template v-slot:item.status="{ item }">
        <v-icon>
          {{ getStatusIcon(item.status) }}
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Select from "./Select.vue";

export default {
  components: {
    Select,
  },
  props: {
    data: Array,
  },
  computed: {
    filteredData() {
      console.log(this.data);
      return this.data.filter((item) => item && Object.keys(item).length > 1);
    },
    headers() {
      return [
        { title: "Status", key: "status" },
        { title: "Имя", key: "firstName" },
        { title: "Фамилия", key: "lastName" },
        { title: "Компания", key: "company" },
        { title: "Специальность", key: "jobTitle" },
        { title: "Телефон", key: "phone" },
        { title: "E-mail", key: "email" },
        { title: "Интересы", key: "interests" },
      ];
    },
  },
  methods: {
    getStatusIcon(status) {
      switch (status) {
        case true:
          return " mdi-cloud-check-variant";
        case false:
          return "mdi-cloud-alert"; 
        default:
          return "mdi-help-circle"; 
      }
    },
  },
};
</script>

<style scoped>
</style>
