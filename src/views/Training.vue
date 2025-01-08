<script setup>
import { ref } from "vue";
import { QBtn } from "quasar";
import router from "../router/router";
import Exercise from "../components/Exercise.vue";
import { Platform } from "quasar";
import { getRef } from "../utils/utils";

const excercises = ref([]);
const isMobile = Platform.is.mobile;
let trainingContainer;

const goBack = () => {
  router.push("/dashboard");
};

const addExcercise = () => {
  excercises.value.push({});
  // Scroll to the bottom of the training container for better user experience.
  if (
    trainingContainer &&
    trainingContainer.scrollHeight > trainingContainer.clientHeight
  ) {
    trainingContainer.scrollTop = trainingContainer.scrollHeight;
  } else if (!trainingContainer) {
    trainingContainer = getRef("trainingContainer");
  }
};

const removeExercise = (index) => {
  excercises.value.splice(index, 1);
};
</script>

<template>
  <div class="fullscreen pageBackground mainContent">
    <div class="trainingContainer" id="trainingContainer">
      <QBtn
        v-if="!isMobile"
        class="fixed-top-left"
        flat
        round
        @click="() => goBack()"
        icon="chevron_left"
      />
      <div class="titleContainer">
        <div>Treeni</div>
      </div>
      <div class="center">
        <Exercise
          v-for="index in excercises"
          :key="index"
          @delete="removeExercise(index)"
        />

        <div class="buttonContainer fixed-right">
          <q-btn
            class="addBtn"
            round
            color="primary"
            icon="add"
            @click="addExcercise"
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
  height: 99dvh;
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
  padding: 20px;
  font-size: 2rem;
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
  border: 1px solid silver;
}
</style>
