const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {     getMiembros,
    paginate,
    crear,
    getMiembroById,
    getMiembrosByCodIglesia,
    actualizar,
    borrarMiembro } = require('../controllers/miembro-controller');
const router = Router();
/*
RUTA  /api/miembros
*/
router.get('/pagination',validarJWT,  paginate);
router.get('/',validarJWT,  getMiembros);
router.get('/:id',validarJWT,  getMiembroById);
router.get('/:codIglesia',validarJWT,  getMiembrosByCodIglesia);
router.put('/:id',[], actualizar);
router.post('/' ,[], crear);
router.delete('/:id',validarJWT,  borrarMiembro);
module.exports = router;
 