<template>
  <v-card class="border-none">
    <v-row class="center">
      <v-col cols="9" class="text-left">
        <h2 class="ml-4">Обработанные</h2> 
        <v-btn icon @click="refresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3" class="text-right">
        <Select :actions="actions" onActionselect="handleSelectAction" :selectedItem="selectedItem"></Select> 
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
    <template v-slot:item="{ item }">
        <tr @click="selectItem(item)" :class="{ 'selected-row': selectedItem && selectedItem.id === item.id }">
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.jobTitle }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.interests }}</td>
        </tr>
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
    refresh: Function,
  },
  data() {
    return {
      actions: ["Добавить", "Изменить", "Удалить"],
      selectedItem: null,
    };
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
    handleSelectAction(action) {
      if ((action === "Изменить" || "Удалить") && this.selectedItem) {
        this.$emit("select", this.selectedItem); 
      }
    },
    selectItem(item) {
      this.selectedItem = item; 
    },
  },
};
</script>

<style scoped>
.selected-row {
  background-color: lightblue; 
}
</style>
