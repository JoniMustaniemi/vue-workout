<script setup>
import { QBtn, QInput } from "quasar";
import { ref, onMounted } from "vue";

// Emit event for deleting the exercise
const emit = defineEmits(["delete"]);

// Reactive visibility state for animation
const isVisible = ref(false);

// Reactive state for input fields
const exercise = ref({
  exercise: "",
  weight: "",
  repeats: "",
  sets: "",
});

// Handle component mount for animation
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 200);
});

// Emit delete event
const deleteExercise = () => {
  emit("delete");
};
</script>

<template>
  <div class="full-width excerciseContainer">
    <div class="exercise border" :class="{ slideIn: isVisible }">
      <QInput
        label-color="grey"
        label="Harjoitus"
        v-model="exercise.exercise"
        input-style="color: whitesmoke;"
      />
      <QInput
        label-color="grey"
        outlined
        class="exerciseItem"
        label="Paino"
        v-model="exercise.weight"
        type="number"
        input-style="color: whitesmoke;"
      />
      <QInput
        label-color="grey"
        outlined
        class="exerciseItem"
        label="Toistot"
        v-model="exercise.repeats"
        type="number"
        input-style="color: whitesmoke;"
      />
      <QInput
        label-color="grey"
        outlined
        class="exerciseItem"
        label="Sarjat"
        v-model="exercise.sets"
        type="number"
        input-style="color: whitesmoke;"
      />
      <QBtn
        color="red"
        flat
        class="relative deleteBtn"
        icon="cancel"
        @click="deleteExercise"
      />
    </div>
  </div>
</template>

<style scoped>
.exercise {
  margin: 5px 10px;
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 1s ease, opacity 1s ease;
  text-align: center;
}

.slideIn {
  opacity: 1;
  transform: translateY(0);
}

.deleteBtn {
  position: absolute;
  top: 0;
  right: 0;
}

.exerciseItem {
  display: inline-block;
  width: 33%;
  margin: 5px;
}
</style>
