import pool from "../config/db.js";

//Obtener los carritos por usuario
const getUserCart = async (id) => {
  try {
    const cartQuery = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [id]
    );
    let cart;
    if (cartQuery.rows.length === 0) {
      cart = await createCart(id);
    } else {
      cart = cartQuery.rows[0];
    }

    const productsQuery = await pool.query(
      `SELECT cp.id, p.name, p.price, cp.quantity, cp.img_url
       FROM carts c
       JOIN cart_product cp ON c.id = cp.cart_id
       JOIN products p ON cp.product_id = p.id
       WHERE c.user_id = $1`,
      [id]
    );
    const products = productsQuery.rows;
    return { cart, products };
  } catch (error) {
    console.error("Error al obtener el carrito del usuario:", error.message);
    throw new Error("Hubo un error al obtener el carrito del usuario");
  }
};
//Crear el carrito si es que el usuario no tiene un carrito creado
const createCart = async (user_id) => {
  try {
    const query = await pool.query(
      `INSERT INTO carts (user_id) 
       VALUES($1) 
       ON CONFLICT (user_id) 
       DO UPDATE SET updated_at = CURRENT_TIMESTAMP 
       RETURNING *`,
      [user_id]
    );
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación CREATECART");
  }
};
//Agregar un producto al carrito
const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const productQuery = "SELECT img_url FROM products WHERE id = $1";
    const productResult = await pool.query(productQuery, [productId]);
    const imgUrl = productResult.rows[0]?.img_url;
    const query = `
      INSERT INTO cart_product(cart_id, product_id, quantity, img_url) 
      VALUES($1, $2, $3, $4)
      ON CONFLICT (cart_id, product_id) 
      DO UPDATE SET quantity = cart_product.quantity + EXCLUDED.quantity, img_url = EXCLUDED.img_url
      RETURNING *`;
    const values = [cartId, productId, quantity, imgUrl];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación ADDPRODUCTTOCART");
  }
};
//Modelo para eliminar el producto del carrito
const removeProductFromCart = async (cartProductId) => {
  try {
    const query = `
      DELETE FROM cart_product 
      WHERE id = $1 
      RETURNING *`;
    const values = [cartProductId];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error.message);
    throw new Error("Hubo un error al eliminar el producto del carrito");
  }
};
//Calcular el total del carrito (precio)
const calculateCartTotal = async (cartId) => {
  try {
    const query = `
      SELECT SUM(p.price * cp.quantity) AS total
      FROM cart_product cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = $1
    `;
    const result = await pool.query(query, [cartId]);
    return result.rows[0]?.total || 0;
  } catch (error) {
    console.error("Error al calcular el total del carrito:", error);
    throw new Error("Hubo un error con la operación CALCULATECARTTOTAL");
  }
};
const getCartProducts = async (cartId) => {
  const query = `
    SELECT cp.id as cart_product_id, p.id as product_id, p.name, p.price, cp.quantity, p.img_url
    FROM cart_product cp
    JOIN products p ON cp.product_id = p.id
    WHERE cp.cart_id = $1;
  `;
  const values = [cartId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener productos del carrito:', error);
    throw error;
  }
};
export const cartModel = {
  getUserCart,
  createCart,
  addProductToCart,
  removeProductFromCart,
  calculateCartTotal,
  getCartProducts
};
