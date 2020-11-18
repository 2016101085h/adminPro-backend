//gettodod

const { response } = require("express");
const usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getTodo = async (req, resp = response) => {
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');

    // const usuarios = await usuario.find({nombre: regexp});
    // const medicos = await Medico.find({nombre: regexp});
    // const hospitales = await Hospital.find({nombre: regexp});

    const [usuarios, medicos, hospitales] = await Promise.all([
        usuario.find({nombre: regexp}),
        Medico.find({nombre: regexp}),
        Hospital.find({nombre: regexp})
    ])
    resp.json({ 
        ok: true,
        usuarios,
        medicos,
        hospitales

    })
}


const getDocumentosColeccion = async (req, resp = response) => {
    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');
    let data = []

    switch (coleccion) {
        case 'medicos':
            data = await Medico.find({nombre: regexp}).populate('usuario','nombre img').populate('hospital','nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({nombre: regexp}).populate('usuario',' nombre img');
        break;
        case 'usuarios':
            data = await usuario.find({nombre: regexp});
         
        break;
        default: 
            return resp.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
        }
        resp.json({
            ok: true,
            resultados: data
        })

    const [usuarios, medicos, hospitales] = await Promise.all([
        usuario.find({nombre: regexp}),
        Medico.find({nombre: regexp}),
        Hospital.find({nombre: regexp})
    ])
    // resp.json({ 
    //     ok: true,
    //     usuarios,
    //     medicos,
    //     hospitales

    // })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}