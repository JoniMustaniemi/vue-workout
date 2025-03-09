<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  QCard,
  QCardSection,
  QCardActions,
  QInput,
  QIcon,
  QBtn,
  QSpinnerGears,
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
const isLoggedIn = ref(false);
const dialog = ref(false);
const showForm = ref(true);
const router = useRouter();

const handleLoginInput = async () => {
  emailError.value = false;
  passwordError.value = false;
  emailErrorMessage.value = "";
  passwordErrorMessage.value = "";
};

const handleLogin = async () => {
  dialog.value = true;
  isLoggedIn.value = false;

  setTimeout(async () => {
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
      dialog.value = false;
      return;
    }

    if (!email.value) {
      emailError.value = true;
      emailErrorMessage.value = "Email is required";
      dialog.value = false;
      return;
    }

    if (!password.value) {
      passwordError.value = true;
      passwordErrorMessage.value = "Password is required";
      dialog.value = false;
      return;
    }

    // Validate email format
    const isEmailValid = await validateEmail(email.value);
    if (!isEmailValid) {
      emailError.value = true;
      emailErrorMessage.value = "Please enter a valid email address.";
      dialog.value = false;
      return;
    }

    try {
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
        if (email.value === user.email) {
          emailFound.value = true;

          if (password.value !== user.password) {
            passwordError.value = true;
            passwordErrorMessage.value =
              "Password was incorrect, please try again";
            dialog.value = false;
            return;
          }

          showForm.value = false;
          isLoggedIn.value = true;
          setTimeout(() => {
            dialog.value = false;
            router.push("/dashboard");
          }, 2000);
          return;
        }
      }

      if (!emailFound.value) {
        emailError.value = true;
        passwordError.value = true;
        emailErrorMessage.value =
          "Email address or password was incorrect, please try again";
        dialog.value = false;
        return;
      }
    } catch (error) {
      console.error("Connection test failed:", error.message);
      emailError.value = true;
      emailErrorMessage.value =
        "Unable to connect to the server. Please try again.";
      dialog.value = false;
    }
  }, 1000);
};
</script>
<template>
  <QPage class="q-pa-md">
    <QCard class="q-pa-md fullscreen loginModal">
      <!-- Login Form -->
      <QCardSection v-if="showForm">
        <div class="text-h5 text-center q-mb-sm text-white">Welcome</div>
        <div class="text-subtitle1 text-center q-mb-md text-white">
          Please log in to continue.
        </div>
        <QForm @submit="handleLogin" class="q-gutter-md loginForm">
          <!-- Email Input -->
          <QCardSection>
            <QInput
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
            <!-- Password Input -->
            <QInput
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
                <QIcon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer pwIcon"
                  @click="isPwd = !isPwd"
                />
              </template>
            </QInput>
          </QCardSection>
          <!-- Login Button -->
          <QCardActions align="center">
            <QBtn
              color="primary"
              label="Login"
              @click="handleLogin"
              class="full-width text-grey loginButton"
            />
          </QCardActions>
        </QForm>
      </QCardSection>

      <!-- Loading Spinner -->
      <QDialog
        persistent
        v-model="dialog"
        backdrop-filter="brightness(50%)"
        class=""
      >
        <QCardSection class="LoadingContainer">
          <div v-if="!isLoggedIn" class="loadingContent">
            <QSpinnerGears color="teal-9" size="50px" />
            <p>Kirjaudutaan sisään...</p>
          </div>
          <div v-else class="loadingContent">
            <QIcon name="check_circle" color="green" size="50px" />
            <p>Kirjautuminen onnistui!</p>
          </div>
        </QCardSection>
      </QDialog>
    </QCard>
  </QPage>
</template>

<style scoped>
.loginModal {
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.loginForm {
  max-width: 400px;
  min-width: 250px;
  margin: 0 auto;
}

.loginButton {
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.pwIcon {
  color: white;
}

.LoadingContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  text-align: center;
  color: white;
}

.loadingContent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
