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
const emailFound = ref(false);
const password = ref("");
const emailError = ref(false);
const passwordError = ref(false);
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");
const isPwd = ref(true);
const router = useRouter();

const isLoading = ref(false);
const showForm = ref(true);

// Handle email input changes.
const handleLoginInput = async () => {
  emailError.value = false;
  passwordError.value = false;
  emailErrorMessage.value = "";
  passwordErrorMessage.value = "";
};

// Handle login logic.
const handleLogin = async () => {
  emailFound.value = false;
  emailError.value = false;
  passwordError.value = false;
  emailErrorMessage.value = "";
  passwordErrorMessage.value = "";

  if (!email.value && !password.value) {
    emailError.value = true;
    passwordError.value = true;
    emailErrorMessage.value = "Value required";
    passwordErrorMessage.value = "Value required";
    return;
  }

  if (!email.value) {
    emailError.value = true;
    emailErrorMessage.value = "Email is required";
    return;
  }

  if (!password.value) {
    passwordError.value = true;
    passwordErrorMessage.value = "Password is required";
    return;
  }

  const isEmailValid = await validateEmail(email.value);
  if (!isEmailValid) {
    emailError.value = true;
    emailErrorMessage.value = "Please enter a valid email address.";
    return;
  }

  try {
    // Test connection with a GET request to the backend.
    const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    for (const user of data[0].users) {
      // Check if user email matches.
      if (email.value === user.email) {
        emailFound.value = true;

        // Check if the password matches.
        if (password.value !== user.password) {
          passwordError.value = true;
          passwordErrorMessage.value =
            "Password was incorrect, please try again";
          return;
        }

        // If email and password are correct, proceed.
        showForm.value = false;
        isLoading.value = false;
        router.push("/dashboard");
        return;
      }
    }

    // If email is not found or invalid, show error.
    if (!emailFound.value) {
      emailError.value = true;
      passwordError.value = true;
      emailErrorMessage.value =
        "Email address or password was incorrect, please try again";
      return;
    }
  } catch (error) {
    console.error("Connection test failed:", error.message);
    emailError.value = true;
    errorMessage.value = "Unable to connect to the server. Please try again.";
    isLoading.value = false;
  }
};
</script>

<template>
  <q-page class="q-pa-md">
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

        <q-form @submit="handleLogin" class="q-gutter-md loginForm">
          <!-- Login Form -->
          <q-card-section>
            <q-input
              standout
              label-color="white"
              input-style="color: white;"
              v-model="email"
              label="Email"
              class="q-mb-md passwordInput"
              type="email"
              bg-color="primary"
              required
              autocomplete="email"
              :error="emailError"
              :error-message="emailErrorMessage"
              @focus="handleLoginInput"
            />
            <q-input
              standout
              v-model="password"
              label="Password"
              label-color="white"
              input-style="color: white;"
              bg-color="primary"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="new-password"
              :error="passwordError"
              :error-message="passwordErrorMessage"
              @focus="handleLoginInput"
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
              color="primary"
              label="Login"
              @click="handleLogin"
              class="full-width text-grey loginButton"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </transition>

    <!-- Loading Spinner -->
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

.loginForm {
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
}

.loginButton {
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.pwIcon {
  color: white;
}
</style>
