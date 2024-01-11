<template>
  <div>
    <h2>List of questions</h2>
    <table>
      <thead>
        <tr>
          <th>Ask</th>
          <th>Correct answer</th>
          <th>Observation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question._id">
          <td>{{ question.text }}</td>
          <td>{{ question.correctAnswer ? "Yes" : "No" }}</td>
          <td>{{ question.observation }}</td>
          <td>
            <button class="btn-option" @click="emitEdit(question._id)">
              Edit
            </button>
            <button class="btn-option" @click="emitDelete(question._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  questions: Array,
});

const emit = defineEmits(["edit", "delete"]);

const emitEdit = (id) => {
  emit("edit", id);
};

const emitDelete = (id) => {
  emit("delete", id);
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: auto;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
}

.btn-option {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-option:nth-child(2) {
  background-color: #f44336;
}

/* Diseño responsive */
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  thead {
    display: none;
  }

  tr,
  td {
    display: block;
    width: 97%;
  }

  td {
    text-align: center;
    position: relative;
  }

  td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    text-align: left;
    font-weight: bold;
  }

  .btn-option {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
