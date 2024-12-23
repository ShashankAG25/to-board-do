import { createUser as createUserService } from "../services/user.servcie.js";
import { createUserValidator } from "../validators/user.validator.js";

async function createUser(req, res) {
  try {
    await createUserValidator.validate(req.body, { abortEarly: false });

    // If validation passes, proceed to create the user
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return res.status(500).json({ message: error.message });
  }
}

export { createUser };
