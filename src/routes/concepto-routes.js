const { Router } = require('express'); 
const { validarJWT } = require('../middlewares/validar-jwt')
const {  getConceptos,
    crearConcepto,
    getConceptosByCodCaja,
    getConceptoById, 
    actualizarConcepto, 
    borrarConcepto } = require('../controllers/concepto-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
/*
RUTA  /api/conceptos
*/
router.get('/',
    [ validarJWT,
        check('codIglesia').isNumeric(),
        validarCampos
    ], getConceptos);


    router.get('/caja',
    [ validarJWT,
        check('codCaja').isNumeric(),
        validarCampos
    ], getConceptosByCodCaja);
    

router.get('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], getConceptoById);
router.put('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], actualizarConcepto);
router.post('/' , validarJWT, crearConcepto);
router.delete('/:id',
    [ validarJWT,
        check('id').isNumeric(),
        validarCampos
    ], borrarConcepto);
module.exports = router;
