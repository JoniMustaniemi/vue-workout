<script setup>
import { ref } from "vue";
import { QBtn, QIcon, QDialog, QCardSection, QSpinnerGears } from "quasar";
import router from "../router/router";
import Exercise from "../components/Exercise.vue";
import { Platform } from "quasar";
import { scrollToBottom } from "../utils/utils";
import trainingImg from "/images/fitness.png";
import { getDate } from "../utils/utils";

const exercises = ref([]);
let nextId = 0;
const isMobile = Platform.is.mobile;
const trainingContainer = ref(null);
const dialog = ref(false);
const isSaved = ref(false);

const goBack = () => {
  router.push("/dashboard");
};

const addExercise = () => {
  const currentDate = getDate();

  exercises.value.push({
    id: nextId++,
    exercise: "",
    weight: "",
    repeats: "",
    sets: "",
    date: currentDate,
  });

  scrollToBottom(trainingContainer);
};

const removeExercise = (id) => {
  exercises.value = exercises.value.filter((exercise) => exercise.id !== id);
};

const updateExercise = (updatedExercise) => {
  const index = exercises.value.findIndex(
    (exercise) => exercise.id === updatedExercise.id
  );

  if (index !== -1) {
    exercises.value.splice(index, 1, updatedExercise);
  }
};

const saveExercise = () => {
  dialog.value = true;
  isSaved.value = false;

  const exercisesWithoutId = exercises.value.map(({ id, ...rest }) => rest);

  console.log("EXERCISES WITHOUT ID", exercisesWithoutId);

  try {
    const email = "test@example.com";
  } catch (error) {}

  setTimeout(() => {
    isSaved.value = true;
    setTimeout(() => {
      dialog.value = false;
    }, 2000);
  }, 5000);
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
        @click="goBack"
        icon="chevron_left"
      />
      <div class="titleContainer">
        <img :src="trainingImg" alt="Training Image" />
      </div>
      <div class="center">
        <Exercise
          v-for="exercise in exercises"
          :key="`exercise-${exercise.id}`"
          :id="exercise.id"
          @delete="removeExercise"
          @update="updateExercise"
        />

        <div class="buttonContainer">
          <QBtn class="saveBtn" round color="primary" @click="saveExercise">
            <QIcon name="save" color="green-5" />
          </QBtn>
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
    <QDialog
      persistent
      v-model="dialog"
      backdrop-filter="brightness(50%)"
      class="saveOverlay"
    >
      <QCardSection class="spinnerContainer">
        <div v-if="!isSaved" class="iconContainer">
          <QSpinnerGears color="teal-9" size="50px" />
          <p class="saveDescription">Tallennetaan...</p>
        </div>
        <div v-else class="iconContainer">
          <QIcon name="check_circle" color="green" size="50px" />
          <p class="saveDescription complete">Muutokset tallennettu!</p>
        </div>
      </QCardSection>
    </QDialog>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.mainContent {
  font-family: "Roboto", "Open Sans", "Lato", sans-serif;
}

.trainingContainer {
  position: relative;
  height: 100dvh;
  overflow-y: auto;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
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
  position: absolute;
  top: 0;
  width: fit-content;
  height: fit-content;
  right: 10px;
  top: 30px;
}

.saveBtn {
  margin-right: 15px;
}

.spinnerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
}

.iconContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.saveDescription {
  font-family: "Roboto", "Open Sans", "Lato", sans-serif;
  color: white;
  margin-top: 10px;
  animation: pulse 1.5s infinite;
}

.complete {
  animation: unset;
}
</style>
