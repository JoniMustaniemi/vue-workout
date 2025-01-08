<script setup>
import { ref } from "vue";
import { QBtn } from "quasar";
import router from "../router/router";
import Exercise from "../components/Exercise.vue";
import { Platform } from "quasar";
import { scrollToBottom } from "../utils/utils";
import trainingImg from "/images/fitness.png";

const excercises = ref([]);
let nextId = 0;
const isMobile = Platform.is.mobile;
const trainingContainer = ref(null);

const goBack = () => {
  router.push("/dashboard");
};

const addExercise = () => {
  excercises.value.push({
    id: nextId++,
    exercise: "",
    weight: "",
    repeats: "",
    sets: "",
  });

  scrollToBottom(trainingContainer);
};

const removeExercise = (id) => {
  excercises.value = excercises.value.filter((exercise) => exercise.id !== id);
};
</script>

<template>
  <div class="fullscreen pageBackground mainContent">
    <div
      class="trainingContainer"
      id="trainingContainer"
      ref="trainingContainer"
    >
      <QBtn
        v-if="!isMobile"
        class="fixed-top-left"
        flat
        round
        @click="() => goBack()"
        icon="chevron_left"
      />
      <div class="titleContainer">
        <img :src="trainingImg" alt="Training Image" />
      </div>
      <div class="center">
        <Exercise
          v-for="exercise in excercises"
          :key="`exercise-${exercise.id}`"
          :id="exercise.id"
          @delete="removeExercise"
        />

        <div class="buttonContainer fixed-right">
          <QBtn
            class="addBtn"
            round
            color="primary"
            icon="add"
            @click="addExercise"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContent {
  font-family: "Roboto", "Open Sans", "Lato", sans-serif;
}

.trainingContainer {
  height: 100dvh;
  overflow-y: auto;
}

.pageBackground {
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.titleContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}

.titleContainer img {
  width: 100px;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: min-content;
}

.buttonContainer {
  width: fit-content;
  height: fit-content;
  right: 20px;
  top: 20px;
}
</style>
