import express from "express";

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
  AdminUserDelete,
  AdminUserUpdate,
  AdminUserEdit,
  AdminContact,
  AdminContactDel,
  AdminService,
  AdminServiceDelete,
  AddServices,
} from "../controllers/auth-controllers.js";

const router = express.Router();
import validate from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";

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

router.route("/UserJwt").get(authMiddleware, UserJwt);

router.route("/service").get(servicePage);

router.route("/users").get(authMiddleware, adminMiddleware, AdminUsers);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, AdminUserDelete);
router
  .route("/admin/users/:id")
  .get(authMiddleware, adminMiddleware, AdminUserUpdate);
router
  .route("/admin/users/:id")
  .post(authMiddleware, adminMiddleware, AdminUserEdit);

router
  .route("/admin/contacts")
  .get(authMiddleware, adminMiddleware, AdminContact);

router
  .route("/admin/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, AdminContactDel);

router.get("/admin/services", authMiddleware, adminMiddleware, AdminService);

// Add a new service
router.post("/admin/services", authMiddleware, adminMiddleware);

// Delete a service
router.delete(
  "/admin/services/:id",
  authMiddleware,
  adminMiddleware,
  AdminServiceDelete
);
router
  .route("/admin/addServices")
  .post(authMiddleware, adminMiddleware, AddServices);
export default router;
