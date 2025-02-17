<template>
  <div>
    <select class="custom-select" @change="handleAction">
      <option value="" disabled selected>Действие</option>
      <option v-for="action in actions" :key="action" :value="action">
        {{ action }}
      </option>
    </select>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="isEditMode">Изменить элемент</span>
          <span v-else>Добавить элемент</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="formData.firstName"
              label="Имя"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.lastName"
              label="Фамилия"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.company"
              label="Компания"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.jobTitle"
              label="Специальность"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.phone"
              label="Телефон"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.interests"
              label="Интересы"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Отменить</v-btn>
          <v-btn color="primary" @click="submitForm">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      formData: {
        firstName: "",
        lastName: "",
        company: "",
        jobTitle: "",
        phone: "",
        email: "",
        interests: "",
      },
      isEditMode: false,
      actions: ["Добавить", "Изменить", "Удалить"],
    };
  },
  methods: {
    handleAction(event) {
      const action = event.target.value; 
      console.log("Выбрано действие:", action); 

      if (action === "Добавить") {
        this.isEditMode = false;
        this.formData = {
          id: 50,
          email: "",
          phone: "",
          status: false,
          company: "",
          jobTitle: "",
          lastName: "",
          firstName: "",
          interests: "",
        };
        this.dialog = true; 
      } else if (action === "Изменить") {
        this.isEditMode = true;
        this.formData = { name: "Текущее имя", email: "текущий@имейл.com" }; 
        this.dialog = true;
      } else if (action === "Удалить") {
        console.log("Удалить элемент");
        
      }
    },
    async submitForm() {
      const url = this.isEditMode
        ? "https://retoolapi.dev/D6xLg4/data/1" 
        : "https://retoolapi.dev/D6xLg4/data"; 

      const method = this.isEditMode ? "PUT" : "POST"; 

      try {
        console.log('Данные для отправки:', this.formData);
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData), 
        });

        if (!response.ok) {
          throw new Error("Ошибка при отправке данных"); 
        }
        this.dialog = false; 
        console.log("Данные успешно отправлены");
      } catch (error) {
        console.error("Ошибка:", error); 
      }
    },
  },
};
</script>

<style scoped>
.custom-select {
  width: 80%;
  height: 40px;
  text-align: center;
  background-color: #283593;
  color: white;
  border-radius: 5px;
}
option {
  background-color: white;
  color: black;
  border-radius: 5px;
}
</style>
