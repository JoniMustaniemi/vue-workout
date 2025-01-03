<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { QCard, QInnerLoading, QSpinnerGears, QCardSection } from "quasar";
import { useRouter } from "vue-router";

const showContent = ref(false);
const visible = ref(true);
let backPressedOnce = false;
const router = useRouter();

const cards = ref([
  {
    title: "Treeni",
    image: "/images/fitness.png",
    description: "",
    route: "/training",
  },
  {
    title: "Kehitys",
    image: "/images/chart.png",
    description: "",
    route: "/development",
  },
  {
    title: "Ruokavalio",
    image: "/images/diet.png",
    description: "",
    route: "/diet",
  },
  {
    title: "Kalenteri",
    image: "/images/calendar.png",
    description: "",
    route: "/calendar",
  },
]);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
    visible.value = false;
  }, 1200);
});

const navigateClick = (route) => {
  if (!route) return;
  router.push(route);
};

const navigateTouch = (route, event) => {
  event.preventDefault();
  if (!route) return;
  router.push(route);
};
</script>

<template>
  <div class="text-white fullscreen pageBackground">
    <q-inner-loading :showing="visible" class="loadingOverlay">
      <q-spinner-gears size="50px" color="teal-9" />
    </q-inner-loading>

    <div v-if="showContent" class="contentWrapper">
      <h4 class="BannerTitle text-capitalize">My Workout v2</h4>

      <div class="cardGrid">
        <q-card
          v-for="(card, index) in cards"
          :key="index"
          class="cardElement text-black"
          v-bind:class="{ 'fade-in': showContent }"
          v-touch:tap="(event) => navigateTouch(card.route, event)"
          @click="() => navigateClick(card.route)"
        >
          <img :src="card.image" :alt="card.title" />
          <q-card-section class="title">
            <div @pointerup="navigate(card.route)" class="text-h6 text-white">
              {{ card.title }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            {{ card.description }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loadingOverlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.contentWrapper {
  overflow-y: auto;
  padding: 20px;
}

.BannerTitle {
  text-align: center;
}

.cardGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 1000px;
  margin: 0 auto;
}

.cardElement {
  text-align: center;
  vertical-align: middle;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  height: 30dvh;
  max-height: 150px;
  max-width: 400px;
  min-height: fit-content;
  min-width: 150px;
  border: 3px double silver;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.title {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.cardElement img {
  width: 40%;
  height: 40%;
  max-width: 60px;
  min-width: 60px;
  margin: 20px auto;
  background-size: contain;
  filter: invert(0.8);
}

.cardElement.fade-in {
  opacity: 1;
}

.pageBackground {
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
