<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  QCard,
  QCardSection,
  QCardActions,
  QInput,
  QBtn,
  QIcon,
  QSpinner,
  QDialog,
  QForm,
  QPage,
} from "quasar";
import { validateEmail } from "../utils/utils";

const email = ref("");
const password = ref("");
const emailError = ref(false);
const errorMessage = ref("");
const isPwd = ref(true);
const router = useRouter();

const isLoading = ref(false);
const showForm = ref(true);

// Handle email input changes.
const handleEmailInput = async () => {
  emailError.value = false;
  errorMessage.value = "";
};

// Handle login logic.
const handleLogin = async () => {
  const isValidEmail = true; /*  await validateEmail(email.value); */

  if (!isValidEmail) {
    emailError.value = true;
    errorMessage.value = "Invalid email format";
    return;
  }

  showForm.value = false;
  isLoading.value = false;

  setTimeout(() => {
    //isLoading.value = false;
    router.push("/page1"); // Navigate to page1 after 2 seconds
  }, 100);
};
</script>

<template>
  <q-page class="q-pa-md">
    <!-- Fullscreen card with login form, only visible while not loading -->
    <transition name="fade">
      <q-card
        v-if="showForm"
        class="q-pa-md fullscreen loginModal"
        @submit.prevent="handleLogin"
      >
        <q-card-section>
          <div class="text-h5 text-center q-mb-sm text-white">Welcome</div>
          <div class="text-subtitle1 text-center q-mb-md text-white">
            Please log in to continue.
          </div>
        </q-card-section>

        <q-form @submit="handleLogin" class="q-gutter-md">
          <!-- Login Form -->
          <q-card-section>
            <q-input
              standout
              color="white"
              label-color="white"
              input-style="color: white;"
              v-model="email"
              label="Email"
              class="q-mb-md passwordInput"
              type="email"
              required
              autocomplete="email"
              :error="emailError"
              :error-message="errorMessage"
              @update:model-value="handleEmailInput"
            />
            <q-input
              standout
              v-model="password"
              label="Password"
              color="white"
              label-color="white"
              input-style="color: white;"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="new-password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer pwIcon"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <!-- Login Button -->
          <q-card-actions align="center">
            <q-btn
              label="Login"
              @click="handleLogin"
              class="full-width text-grey loginButton"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </transition>

    <!-- Loading Spinner (centered on screen) -->
    <q-dialog v-model="isLoading" persistent>
      <q-card-section class="q-pt-none q-mt-none">
        <q-spinner color="primary" size="50px" />
      </q-card-section>
    </q-dialog>
  </q-page>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loginModal {
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.loginButton {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.pwIcon {
  color: white;
}
</style>
