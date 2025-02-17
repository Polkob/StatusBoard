<template>
  <v-card class="border-none">
    <v-row class="center">
      <v-col cols="9" class="text-left">
        <h2 class="ml-4">Обработанные</h2> 
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
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  computed: {
    filteredData() {
      return this.data.filter(item => item.status === true);
    },
    headers() {
      return [
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
};
</script>