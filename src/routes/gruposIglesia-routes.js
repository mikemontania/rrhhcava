const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {     getGruposIglesias,
    crearGrupoIglesia,
    getGrupoIglesiaById, 
    actualizarGrupoIglesia, 
    borrarGrupoIglesia } = require('../controllers/grupoIglesia-controller');
const router = Router();
/*
RUTA  /api/gruposiglesia
*/
router.get('/',validarJWT,  getGruposIglesias);
router.get('/:id',validarJWT,  getGrupoIglesiaById);
router.put('/:id',[], actualizarGrupoIglesia);
router.post('/' ,[], crearGrupoIglesia);
router.delete('/:id',validarJWT,  borrarGrupoIglesia);
module.exports = router;
