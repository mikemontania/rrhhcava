const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {   getByCodMinisterio,
    getByCodMiembro,
    getAll,
    crear,
    getById,
    borrar} = require('../controllers/ministerioMiembro-controller');
const router = Router();
/*
RUTA  /api/ministeriomiembro
*/
router.get('/miembro/:codMiembro',validarJWT,  getByCodMiembro);
router.get('/ministerio/:codMinisterio',validarJWT,  getByCodMinisterio);
router.get('/',validarJWT,  getAll);
router.get('/:id',validarJWT,  getById);
//router.put('/:id',[], actualizarfamiliaMiembro);
router.post('/' ,[], crear);
router.delete('/:id',validarJWT,  borrar);
module.exports = router;
