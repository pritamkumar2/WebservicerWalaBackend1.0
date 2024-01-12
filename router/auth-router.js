import express, { Router } from "express";

import {
  home,
  register,
  registerUser,
  login,
  userLogin,
  contacts,
  contactUser,
  UserJwt,
  servicePage,
  AdminUsers,

} from "../controllers/auth-controllers.js";

const router = express.Router();
import validate from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  signupSchema,
  loginSchema,
  contactSchema,
} from "../validators/auth-validators.js";

router.route("/").get(home);


router
  .route("/register")
  .post(validate(signupSchema), register)
  .get(registerUser);


router.route("/login").post(validate(loginSchema), login).get(userLogin);

router
  .route("/contact")
  .post(validate(contactSchema), contacts)
  .get(contactUser);

router.route("/UserJwt").get(authMiddleware,UserJwt);

router.route("/service").get(servicePage);


router.route("/users").get(AdminUsers);
// router.route("/contacts").get(AdminContacts);


export default router;
