import * as Yup from "yup";

const createUserValidator = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  name: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
  profileImage: Yup.string().url("Invalid URL format").optional(),
});

export { createUserValidator };
