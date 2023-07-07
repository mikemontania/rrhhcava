const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {   getByCodFamilia,
    getByCodMiembro,
    getMiembrosFamilia,
    crearfamiliaMiembro,
    getById,
    borrar } = require('../controllers/miembroFamilia-controller');
const router = Router();
/*
RUTA  /api/miembrofamilia
*/
router.get('/miembro/:codMiembro',validarJWT,  getByCodMiembro);
router.get('/familia/:codFamilia',validarJWT,  getByCodFamilia);
router.get('/',validarJWT,  getMiembrosFamilia);
router.get('/:id',validarJWT,  getById);
//router.put('/:id',[], actualizarfamiliaMiembro);
router.post('/' ,[], crearfamiliaMiembro);
router.delete('/:id',validarJWT,  borrar);
module.exports = router;
