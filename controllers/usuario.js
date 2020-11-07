const {response} = require('express')
const {validationResult } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (request, response) => {
    const usuario = await Usuario.find({}, 'nombre email role google password');
    response.json({
        ok: true,
        usuario,
        uid: request.uid
    })
}

const crearUsuario = async (req, resp = response) => {
    // console.log(req.body);
    const {email, password, nombre} = req.body;

    try{
        const exiteEmail = await Usuario.findOne({ email  })
        if (exiteEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        // guardar usuario
        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario.id);
        resp.json({
            ok: true,
           usuario,
           token
        })

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'erro inesperado'

        })
    }

   
}
const actualizarUsuario = async (req, res = response) =>{
    const uid = req.params.id
    try{
        // Toodo validar token y comprobar si es el usaurio correcto

        const usuarioDB = await Usuario.findById(uid);
        // Actualizaciones 
        const {password, google, email ,...campos} = req.body;
        
        
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (usuarioDB.email !== email){
        //     delete campos.email;
        // }else{
            const existeEmail = await Usuario.findOne({email: email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        // delete campos.password
        // delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
           usuario: usuarioActualizado
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}
const borrarUsuarios = async (req, resp = response) =>{
    const uid = req.params.id;
    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }
       await Usuario.findByIdAndDelete(uid)
       resp.json({
           ok: true,
           msg: 'Usuario eliminado'
       })
    }catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error indesperado'
        })
    }
}
module.exports ={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuarios
}