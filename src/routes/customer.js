const express=require('express');
const router=express.Router();
const controller=require('../controllers/customerControllers')

/**comenzamos a definir como el servidor trabajara las rutas
 * app.s dijimos que utilizariamos el elementos customerRoutes que fue requerido de este archivo
 */
/**por ende cada vez que ejecutemos un metodo router y sea get o post la app sabra donde buscar la ruta */
/**luego en customerController.js definimos que haria la ruta "/" y luego exportamos el modulo, es decir en vez de escribir la funcion dentro de routes, la escribmos en un modulo y lo exportamos. */
router.get('/', controller.list);





module.exports=router;