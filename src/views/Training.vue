<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { App } from "@capacitor/app";

onMounted(() => {
  // Add event listener for the back button press when the component is mounted
  App.addListener("backButton", handleBackButton);
});

onBeforeUnmount(() => {
  // Clean up the event listener when the component is destroyed
  App.removeListener("backButton", handleBackButton);
});

function handleBackButton() {
  // Display an alert when the back button is pressed
  alert("You pressed the back button!");

  // Optionally, prevent the default back navigation by not calling anything else
  // You can also use App.exitApp() to exit the app or App.navigateBack() to navigate back if needed
}
</script>

<template>
  <div class="fullscreen pageBackground">
    <h4>Training</h4>
    <p>Welcome to Training page</p>
  </div>
</template>

<style>
.pageBackground {
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
