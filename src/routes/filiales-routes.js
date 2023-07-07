const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {     getFiliales,
    crearfilial,
    getFilialById,
    getFilialesByCodIglesia,
    actualizarfilial,
    borrarFilial } = require('../controllers/filial-controller');
const router = Router();
/*
RUTA  /api/filiales
*/
router.get('/',validarJWT,  getFiliales);
router.get('/:id',validarJWT,  getFilialById);
router.get('/:codIglesia',validarJWT,  getFilialesByCodIglesia);
router.put('/:id',[], actualizarfilial);
router.post('/' ,[], crearfilial);
router.delete('/:id',validarJWT,  borrarFilial);
module.exports = router;
 