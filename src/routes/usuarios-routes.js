const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getUsuarios, crearUsuarios, getUsuariosById, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuario-controller');
const router = Router();
/*
RUTA  /api/usuarios
*/
router.get('/',validarJWT,  getUsuarios);
router.get('/:id',validarJWT,  getUsuariosById);
router.put('/:id',
    [ validarJWT,
        check('username', 'El username es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], actualizarUsuarios);
router.post('/',
    [ validarJWT,
        check('username', 'El username es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearUsuarios);
router.delete('/:id',validarJWT,  borrarUsuarios);
module.exports = router;
