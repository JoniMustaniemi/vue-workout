import { App } from "@capacitor/app";

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

export async function validateEmail(email) {
  // Check if email is empty
  if (!email) {
    return false;
  }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
