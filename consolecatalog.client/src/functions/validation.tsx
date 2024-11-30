import { LoginDetails, RegisterDetails, User, FormError } from "./interfaces/interfaces";

export function validateUserLogin(user: User, loginDetails: LoginDetails) {
  if (loginDetails.username !== user.username) return false;

  if (loginDetails.password !== user.password) return false;

  return true;
}

export function validateUserRegistrationPassword(
  registerDetails: RegisterDetails
) {
  var formErrors = [] as FormError[];

  const password_regex = new RegExp(
    /^(?!\s)(?![\s\S]*\s$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W])[a-zA-Z0-9\W\s()-]{8,}$/
  );

  if (!password_regex.test(registerDetails.password!))
    formErrors.push({ field: "password", message: "Invalid password format" });

  if (registerDetails.password !== registerDetails.confirm_password)
    formErrors.push({ field: "confirm_password", message: "Passwords do not match" });

  return formErrors;
}
