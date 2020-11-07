const bcrypt = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const Usuario = require('../models/usuario');

const login = async(req, resp = response) => {
    const {email, password} = req.body;
    try{
        // verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return resp.status(400).json({
                ok: false,
                msg: 'Password no valido'
            })
        }

        //generar un token
        const token = await generarJWT(usuarioDB.id);

        resp.json({
            ok: true,
            token
        })
    }catch(error){
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}
module.exports ={
    login
}