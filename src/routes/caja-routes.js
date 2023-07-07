const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getCajas,
    crearCaja,
    getCajaById, 
    actualizarCaja, 
    borrarCaja } = require('../controllers/caja-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/cajas
*/
router.get('/',
    [ validarJWT,
        check('codIglesia').isNumeric(),
        validarCampos
    ], getCajas);
router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getCajaById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarCaja);
router.post('/' , validarJWT, crearCaja);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarCaja);
module.exports = router;
