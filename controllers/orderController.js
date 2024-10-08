import { orderModel } from "../models/orderModel.js";
//Obtener las ordenes de un usuario por ID
const getUserOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await orderModel.getUserOrders(id);
    return res.status(200).json({
      message: "Ordenes del usuario",
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Actualizar una orden existente
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { order_state } = req.body;
  try {
    const order = await orderModel.updateOrder(id, order_state);
    return res.status(200).json({
      message: "Orden actualizada correctamente",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Eliminar una orden por ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await orderModel.deleteOrder(id);
    return res.status(200).json({
      message: "Orden eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Crear una orden
const addOrder = async (req, res) => {
  const { id } = req.user;
  const { total, order_state } = req.body;
  try {
    const order = await orderModel.addOrder(id, total, order_state);
    return res.status(200).json({
      message: "Orden creada correctamente",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Obtener todas las ordenes
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getOrders();
    return res.status(200).json({
      message: "Órdenes",
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
export const orderController = {
  getUserOrders,
  updateOrder,
  deleteOrder,
  addOrder,
  getAllOrders
};
