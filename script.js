const form = document.getElementById("signupForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const toast = document.getElementById("toast");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.setAttribute("aria-pressed", String(isPassword));
  togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  if (field) {
    field.classList.toggle("invalid", Boolean(message));
  }

  if (error) {
    error.textContent = message;
  }
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();

  if (fieldId === "firstName" && !value) {
    setError(fieldId, "First name is required");
    return false;
  }

  if (fieldId === "lastName" && !value) {
    setError(fieldId, "Last name is required");
    return false;
  }

  if (fieldId === "email") {
    if (!value) {
      setError(fieldId, "Email address is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(fieldId, "Enter a valid email address");
      return false;
    }
  }

  if (fieldId === "password") {
    if (!value) {
      setError(fieldId, "Password is required");
      return false;
    }
    if (value.length < 8) {
      setError(fieldId, "Password must be at least 8 characters");
      return false;
    }
  }

  setError(fieldId, "");
  return true;
}

["firstName", "lastName", "email", "password"].forEach((fieldId) => {
  const field = document.getElementById(fieldId);
  field.addEventListener("blur", () => validateField(fieldId));
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) {
      validateField(fieldId);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fieldsValid =
    validateField("firstName") &
    validateField("lastName") &
    validateField("email") &
    validateField("password");

  const terms = document.getElementById("terms");
  const termsError = document.getElementById("termsError");
  const termsValid = terms.checked;
  termsError.textContent = termsValid ? "" : "Please accept the terms to continue";

  if (!fieldsValid || !termsValid) {
    return;
  }

  toast.classList.add("show");
  form.reset();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
});