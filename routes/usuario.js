/*
    Ruta: /api/usuarios
*/
const { Router} = require('express');
const { check} = require('express-validator');
const {getUsuarios, crearUsuario, actualizarUsuario,borrarUsuarios} = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',validarJWT, getUsuarios);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El passowor es obligatorio').not().isEmpty(),
    check('email','El emial es obligatrio').isEmail(),
    validarCampos
] ,crearUsuario);
router.put('/:id', 
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El passowor es obligatorio').not().isEmpty(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
],
actualizarUsuario);

    validarJWT
    router.delete('/:id',validarJWT, borrarUsuarios);

module.exports = router;