const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getDepartamentos,
    crearDepartamento,
    getDepartamentoById, 
    actualizarDepartamento, 
    borrarDepartamento } = require('../controllers/departamento-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/departamentos
*/
router.get('/',
    [ validarJWT
    ], getDepartamentos);
router.get('/:id', 
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getDepartamentoById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarDepartamento);
router.post('/' , validarJWT, crearDepartamento);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarDepartamento);
module.exports = router;
