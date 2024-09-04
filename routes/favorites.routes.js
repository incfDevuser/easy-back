import { favController } from "../controllers/favoriteController.js";
import express from "express";

import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Obtener los favoritos
router.get("/", AuthMiddleware.authToken ,favController.getFovorites);

//Agregar a favoritos
router.post(
  "/add",
  AuthMiddleware.authToken,
  favController.addFavoriteUserProduct
);

router.delete(
  "/product/:product_id",
  AuthMiddleware.authToken,
  favController.removeFavoriteProduct
);
export default router;
