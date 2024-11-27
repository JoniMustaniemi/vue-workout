export async function login() {}

export async function logout() {}

export async function validateEmail(email) {
  // Check if email is empty
  if (!email) {
    return false;
  }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return true if the email matches the regex, otherwise false
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
}
