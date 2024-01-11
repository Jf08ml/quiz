<template>
  <div class="question-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="text">Ask:</label>
        <input type="text" id="text" v-model="question.text" required />
      </div>

      <div class="form-group">
        <label for="correctAnswer">True Answer:</label>
        <input
          type="checkbox"
          id="correctAnswer"
          v-model="question.correctAnswer"
        />
      </div>

      <div class="form-group">
        <label for="observation">Observation:</label>
        <textarea
          id="observation"
          v-model="question.observation"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-button">
        {{ isEditMode ? "Actualizar" : "Crear" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initialQuestion: Object,
});

const emit = defineEmits(["create", "updated"]);

const defaultQuestion = {
  text: "",
  correctAnswer: false,
  observation: "",
};

const question = ref({ ...defaultQuestion });

watch(
  () => props.initialQuestion,
  (newVal) => {
    question.value = newVal ? { ...newVal } : { ...defaultQuestion };
  },
  { deep: true }
);

const isEditMode = computed(() => !!props.initialQuestion);

const handleSubmit = async () => {
  if (isEditMode.value) {
    emit("updated", question.value);
    cleanForm();
  } else {
    emit("create", question.value);
    cleanForm();
  }
};

const cleanForm = () => {
  question.value = { ...defaultQuestion };
};
</script>

<style scoped>
.question-container {
  max-width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-group {
  margin-bottom: 15px;
  width: 90%;
  margin: auto;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group textarea {
  width: 80%;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

/* Estilos Responsive */
@media (max-width: 600px) {
  .question-form {
    padding: 15px;
  }
}
</style>
