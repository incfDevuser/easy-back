import { orderController } from "../controllers/orderController.js";
import { Router } from 'express';
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

//Ruta para obtener todas las ordenes
router.get("/allOrders", AuthMiddleware.authToken, AuthMiddleware.isAdmin, orderController.getAllOrders)

//Ruta para obtener las ordenes de un usuario
router.get('/', AuthMiddleware.authToken ,orderController.getUserOrders);

//Ruta para crear una orden
router.post('/',AuthMiddleware.authToken , orderController.addOrder);

//Ruta para actualizar una orden
router.put('/order/:id',AuthMiddleware.authToken , orderController.updateOrder);

//Ruta para eliminar una orden
router.delete('/order/:id',AuthMiddleware.authToken , orderController.deleteOrder);

//Ruta para actualizar el estado del pedido de una orden

export default router;