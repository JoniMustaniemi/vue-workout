<script setup>
import { QBtn } from "quasar";
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["delete"]);

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 200);
});

const deleteExercise = () => {
  emit("delete");
};
</script>

<template>
  <div class="full-width excerciseContainer">
    <div class="exercise border" :class="{ slideIn: isVisible }">
      <p>I'm an exercise!</p>
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
</style>
