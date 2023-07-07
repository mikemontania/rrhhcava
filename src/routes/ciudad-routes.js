const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getCiudades,
    crearCiudad,
    getCiudadById, 
    actualizarCiudad, 
    borrarCiudad } = require('../controllers/ciudad-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/ciudades
*/
router.get('/',
    [ validarJWT,
        check('codDepartamento').optional().isNumeric(),
        validarCampos
    ], getCiudades);
router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getCiudadById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarCiudad);
router.post('/' , validarJWT, crearCiudad);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarCiudad);
module.exports = router;
