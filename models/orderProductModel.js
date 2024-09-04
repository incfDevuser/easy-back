import pool from "../config/db.js";

//Asociar un producto con una orden
const addProductToOrder = async (orderId, productId, quantity) => {
  try {
    const query = `
      INSERT INTO order_product (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const response = await pool.query(query, [orderId, productId, quantity]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al asociar producto con la orden");
  }
};

export const orderProductModel = {
  addProductToOrder,
};
