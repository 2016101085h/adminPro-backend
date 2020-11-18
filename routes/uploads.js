
const { Router} = require('express');
const expressfileUpload = require('express-fileupload');
const { check} = require('express-validator');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id',validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;