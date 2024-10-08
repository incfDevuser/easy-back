import pool from "../config/db.js";

//Obtener las ordenes por usuario
const getUserOrders = async (id) => {
  try {
    const query = `
            SELECT o.id, o.created_at, o.total, o.order_state
            FROM orders o
            WHERE o.user_id =$1
        `;
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERORDERS");
  }
};
//Agregar una orden
const addOrder = async (user_id, total, order_state) => {
  try {
    const query = `
        INSERT INTO orders (user_id, total, order_state)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
    const response = await pool.query(query, [user_id, total, order_state]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación ADDORDER:", error);
    throw new Error("Hubo un error con la operación ADDORDER");
  }
};
// Actualizar una orden existente
const updateOrder = async (id, order_state) => {
  try {
    const query = `
        UPDATE orders
        SET order_state = $2
        WHERE id = $1
        RETURNING *;
      `;
    const response = await pool.query(query, [id, order_state]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación UPDATEORDER:", error);
    throw new Error("Hubo un error con la operación UPDATEORDER");
  }
};
// Eliminar una orden por ID
const deleteOrder = async (id) => {
  try {
    const query = `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
      `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación DELETEORDER:", error);
    throw new Error("Hubo un error con la operación DELETEORDER");
  }
};
//Obtener todas las ordenes
const getOrders = async () => {
  try {
    const query = `
      SELECT 
        o.id, 
        o.created_at, 
        o.total, 
        o.order_state,
        u.name AS user_name
      FROM 
        orders o
      JOIN 
        users u ON o.user_id = u.id
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error en la operación GETORDERS");
  }
};

export const orderModel = {
  getUserOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrders
};
