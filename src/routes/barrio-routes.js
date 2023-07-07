const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getBarrios,
    crearBarrio,
    getBarrioById, 
    actualizarBarrio, 
    borrarBarrio } = require('../controllers/barrio-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/barrios
*/
router.get('/',
    [ validarJWT,
        check('codCiudad').optional().isNumeric(),
        validarCampos
    ], getBarrios);
router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getBarrioById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarBarrio);
router.post('/' , validarJWT, crearBarrio);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarBarrio);
module.exports = router;
