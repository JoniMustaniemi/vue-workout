<script setup>
// Importing necessary Quasar components
import { ref } from "vue";
import {
  QLayout,
  QHeader,
  QToolbar,
  QBtn,
  QToolbarTitle,
  QAvatar,
  QTabs,
  QRouteTab,
  QDrawer,
  QPageContainer,
} from "quasar";

// Reactive reference for drawer state
const leftDrawerOpen = ref(false);

// Function to toggle the drawer's visibility
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf " class="bg-blue-grey-10">
    <q-header elevated class="bg-teal-10 text-white" height-hint="98">
      <q-toolbar>
        <!-- Hamburger Menu Button -->
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>

      <!-- Tabs -->
      <q-tabs align="left" class="text-white">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <!-- Drawer Sidebar -->
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="200"
      class="bg-teal-10"
    >
      <!-- Drawer Content -->
    </q-drawer>

    <!-- Page Container (Main content) -->
    <q-page-container class="bg-dark-page">
      <!-- Render routed views here -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
