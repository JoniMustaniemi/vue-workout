export async function validateEmail(email) {
  // Check if email is empty
  if (!email) {
    return false;
  }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  return emailRegex.test(email);
}
