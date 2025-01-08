import { App } from "@capacitor/app";
import { nextTick } from "vue";

let backButtonListener;

export const initBackButtonListener = () => {
  if (!backButtonListener) {
    backButtonListener = App.addListener("backButton", handleBackButton);
  }
};

export const removeBackButtonListener = () => {
  if (backButtonListener) {
    backButtonListener.remove();
    backButtonListener = null;
  }
};

const handleBackButton = () => {
  App.navigateBack();
};

export const validateEmail = async (email) => {
  if (!email) {
    return false;
  }

  // Regular expression to validate email format.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const scrollToBottom = (container) => {
  nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight;
    }
  });
};
