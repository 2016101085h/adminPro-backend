const {response} = require('express');
const Hospital =  require('../models/hospital')
const getHospitales = async (req, resp = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre email img')

    resp.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, resp = response) => {
    const uid = req.uid;
    // console.log(uid);
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try{
       const hospitalGuardado =  await hospital.save();
        resp.json({
            ok: true,
            hospital: hospitalGuardado
        })
    }catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
   
}
const actualizarHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}
const borrarHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'borrarHospital'
    })
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}