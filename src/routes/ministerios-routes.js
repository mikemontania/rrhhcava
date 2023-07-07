const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getAll,
    crear,
    getById,
    actualizar,
    borrar,
    paginate } = require('../controllers/ministerio-controller');
const router = Router();
/*
RUTA  /api/ministerios
*/
router.get('/pagination', validarJWT, paginate);
router.get('/', validarJWT, getAll);
router.get('/:id', validarJWT, getById);
router.put('/:id', [], actualizar);
router.post('/', [], crear);
router.delete('/:id', validarJWT, borrar);
module.exports = router;
