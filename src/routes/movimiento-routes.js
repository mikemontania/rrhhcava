const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getMovimientos,
    crearMovimiento,
    getMovimientoById, 
    actualizarMovimiento, 
    borrarMovimiento } = require('../controllers/movimiento-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/movimientos
*/
router.get('/',
    [ validarJWT,
        check('codIglesia').isNumeric(),
        check('codFilial').optional().isNumeric(),
        validarCampos
    ], getMovimientos);
router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getMovimientoById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarMovimiento);
router.post('/' , validarJWT, crearMovimiento);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarMovimiento);
module.exports = router;
