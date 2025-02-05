<script setup>
import { QBtn, QInput } from "quasar";
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["delete", "update"]);

const props = defineProps({
  id: { type: Number, required: true },
});

const exercise = ref({
  id: props.id,
  exercise: "",
  weight: "",
  repeats: "",
  sets: "",
});

const isVisible = ref(false);
let timeoutTimer = null;

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 200);
});

watch(
  () => exercise.value,
  (newValue) => {
    // Clear the existing timeout if there's a new change
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }

    // Set a new timeout to emit the updated exercise after 1 second of inactivity
    timeoutTimer = setTimeout(() => {
      emit("update", newValue); // Emit updated exercise object
    }, 1000);
  },
  { deep: true } // Watch for nested changes in the object
);

const deleteExercise = (id) => {
  emit("delete", id);
};
</script>

<template>
  <div class="full-width excerciseContainer">
    <div class="exercise" :class="{ slideIn: isVisible }">
      <QInput
        outlined
        label-color="grey"
        bg-color="primary"
        class="excerciseTitle"
        label="Harjoitus"
        type="text"
        v-model="exercise.exercise"
        input-style="color: whitesmoke; text-transform: uppercase;"
      />
      <QInput
        label-color="grey"
        outlined
        bg-color="primary"
        class="exerciseItem"
        label="Paino (kg)"
        v-model="exercise.weight"
        type="number"
        input-style="color: whitesmoke;"
      />
      <QInput
        label-color="grey"
        outlined
        bg-color="primary"
        class="exerciseItem"
        label="Toistot"
        v-model="exercise.repeats"
        type="number"
        input-style="color: whitesmoke;"
      />
      <QInput
        label-color="grey"
        outlined
        bg-color="primary"
        class="exerciseItem"
        label="Sarjat"
        v-model="exercise.sets"
        type="number"
        input-style="color: whitesmoke;"
      />

      <QBtn
        color="red"
        flat
        size="10px"
        class="relative deleteBtn"
        icon="cancel"
        @click="() => deleteExercise(id)"
      />
    </div>
  </div>
</template>

<style scoped>
.exercise {
  margin: 10px;
  position: relative;
  opacity: 0;
  transition: 1s ease, opacity 1s ease;
  text-align: center;
}

.slideIn {
  opacity: 1;
  transform: translateY(0);
}

.deleteBtn {
  position: absolute;
  top: -10px;
  left: -22px;
}

.exerciseItem {
  display: inline-block;
  width: 30%;
  margin: 5px;
}
</style>
