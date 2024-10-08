import { userController } from "../controllers/userController.js";
import express from "express";

import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  AuthMiddleware.authToken,
  AuthMiddleware.isAdmin,
  userController.users
);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.delete(
  "/user/:id",
  AuthMiddleware.authToken,
  AuthMiddleware.isAdmin,
  userController.deleteUser
);
router.get("/myProfile", AuthMiddleware.authToken, userController.myProfile);
//FALTA para actualizar la informacion de usuario
router.put(
  "/user/:id",
  AuthMiddleware.authToken,
  
  userController.updateUser
);
export default router;
