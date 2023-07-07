const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getEstadoCiviles,
    crearEstadoCivil,
    getEstadoCivilById, 
    actualizarEstadoCivil, 
    borrarEstadoCivil } = require('../controllers/estadoCivil-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/estadoCiviles
*/
router.get('/',
    [ validarJWT
    ], getEstadoCiviles);
router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getEstadoCivilById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarEstadoCivil);
router.post('/' , validarJWT, crearEstadoCivil);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarEstadoCivil);
module.exports = router;
