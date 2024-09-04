import { favoritesModel } from "../models/favoriteModel.js";

const addFavoriteUserProduct = async (req, res) => {
  const { id } = req.user;
  const { product_id } = req.body;
  try {
    const addUserFavoriteProduct = await favoritesModel.addFavoriteUserProduct(
      id,
      product_id
    );
    return res.status(201).json(addUserFavoriteProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
const removeFavoriteProduct = async (req, res) => {
    const { product_id } = req.params;
    const { id } = req.user;
    try {
      const removeFavoriteUserProduct =
        await favoritesModel.removeFavoriteUserProduct(id, product_id);
      return res.status(200).json(removeFavoriteUserProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  };
  
const getFovorites = async (req, res) => {
  try {
    const { id } = req.user;
    const getUserFavorites = await favoritesModel.getUserFavorites(id);
    return res.status(200).json(getUserFavorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
export const favController = {
  addFavoriteUserProduct,
  removeFavoriteProduct,
  getFovorites,
};
