const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getBilletes,
    crearbillete,
    getBilleteById, 
    actualizarbillete, 
    borrarBilletes } = require('../controllers/billete-controller');
const router = Router();
/*
RUTA  /api/billetes
*/
router.get('/',validarJWT,  getBilletes);
router.get('/:id',validarJWT,  getBilleteById);
router.put('/:id',[], actualizarbillete);
router.post('/' ,[], crearbillete);
router.delete('/:id',validarJWT,  borrarBilletes);
module.exports = router;
