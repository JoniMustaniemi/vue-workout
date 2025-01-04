<script setup>
import { ref } from "vue";
import { QBtn } from "quasar";
import router from "../router/router";
import Exercise from "../components/Exercise.vue";
import { Platform } from "quasar";

const excercises = ref([]);
const isMobile = Platform.is.mobile;

const goBack = () => {
  router.push("/dashboard");
};

const addExcercise = () => {
  excercises.value.push({});
};

const removeExercise = (index) => {
  excercises.value.splice(index, 1);
};
</script>

<template>
  <div class="fullscreen pageBackground mainContent">
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

      <div class="buttonContainer fixed-bottom">
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
</template>

<style scoped>
.mainContent {
  font-family: "Roboto", "Open Sans", "Lato", sans-serif;
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
  margin: 0 auto;
  bottom: 50px;
}
</style>
