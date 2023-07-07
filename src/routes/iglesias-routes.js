const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {     getIglesias,
    crearIglesia,
    getIglesiaById, 
    actualizarIglesia, 
    borrarIglesias } = require('../controllers/iglesia-controller');
const router = Router();
/*
RUTA  /api/iglesias
*/
router.get('/',validarJWT,  getIglesias);
router.get('/:id',validarJWT,  getIglesiaById);
router.put('/:id',[], actualizarIglesia);
router.post('/' ,[], crearIglesia);
router.delete('/:id',validarJWT,  borrarIglesias);
module.exports = router;
 