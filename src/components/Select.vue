<template>
  <div>
    <select class="custom-select" @change="handleAction" ref="actionSelect">
      <option value="" disabled selected>Действие</option>
      <option v-for="action in actions" :key="action" :value="action">
        {{ action }}
      </option>
    </select>

    <v-dialog v-model="dialogDelete" max-width="300px">
      <v-card>
        <v-card-title>
          <span v-if="isDeleteMode">Удаление элемента</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form"> </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialogDelete = false">Отменить</v-btn>
          <v-btn color="primary" @click="handleDelete">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="isEditMode">Изменить элемент</span>
          <span v-else>Добавить элемент</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="formData.firstName"
              label="Имя"
              :rules="[(v) => !!v || 'Заполните поле']"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.lastName"
              label="Фамилия"
              :rules="[(v) => !!v || 'Заполните поле']"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.company"
              label="Компания"
              :rules="[(v) => !!v || 'Заполните поле']"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.jobTitle"
              label="Специальность"
              :rules="[(v) => !!v || 'Заполните поле']"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              label="E-mail"
              :rules="[
                (v) => !!v || 'Заполните поле',
                (v) => /.+@.+\..+/.test(v) || 'E-mail должен быть корректным',
              ]"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.interests"
              label="Интересы"
              :rules="[(v) => !!v || 'Заполните поле']"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Отменить</v-btn>
          <v-btn color="primary" @click="submitForm" :disabled="!valid"
            >Сохранить</v-btn
          >
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
      dialogDelete: false,
      valid: false,
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
      isDeleteMode: false,
      actions: ["Добавить", "Изменить", "Удалить"],
    };
  },
  props: {
    actions: Array,
    onActionSelect: Function,
    selectedItem: Object,
  },
  watch: {
    selectedItem: {
      handler(newValue) {
        if (newValue) {
          this.formData = { ...newValue };
        }
      },
      immediate: true,
    },
  },
  methods: {
    getRandomStatus() {
      return Math.random() < 0.5;
    },
    handleAction(event) {
    const action = event.target.value;
    console.log("Выбрано действие:", action);

    if (action === "Добавить") {
      this.isEditMode = false;
      this.formData = {
        email: "",
        phone: "",
        status: this.getRandomStatus(),
        company: "",
        jobTitle: "",
        lastName: "",
        firstName: "",
        interests: "",
      };
      this.dialog = true;
    } else if (action === "Изменить") {
      if (!this.selectedItem) {
        alert("Пожалуйста, выберите элемент в таблице для изменения.");
        this.$refs.actionSelect.value = "";
        return;
      }
      this.isEditMode = true;
      this.formData = { ...this.selectedItem };
      this.dialog = true;
    } else if (action === "Удалить") {
      if (!this.selectedItem) {
        alert("Пожалуйста, выберите элемент в таблице для удаления.");
        this.$refs.actionSelect.value = ""; 
        return;
      }
      this.isDeleteMode = true;
      this.formData = { ...this.selectedItem };
      console.log("Удалить элемент");
      this.dialogDelete = true;
    }

    this.$refs.actionSelect.value = "";
  },
    async handleDelete() {
      if (!this.selectedItem || !this.selectedItem.id) {
        console.error("Не выбран элемент или ID отсутствует.");
        return;
      }

      const url = `https://api-generator.retool.com/DLcnga/data/${this.selectedItem.id}`;
      const method = "DELETE";

      try {
        console.log("Данные для отправки:", this.formData);
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error("Ошибка при удалении данных");
        }
        this.dialogDelete = false;
        console.log("Данные успешно удалены");
      } catch (error) {
        console.error("Ошибка:", error);
      }
      this.$refs.actionSelect.value = "";
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const url = this.isEditMode
          ? "https://api-generator.retool.com/DLcnga/data/1"
          : "https://api-generator.retool.com/DLcnga/data";

        const method = this.isEditMode ? "PUT" : "POST";

        try {
          console.log("Данные для отправки:", this.formData);
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
        this.$refs.actionSelect.value = "";
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
