const path = require('path')
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, resp = response) => {

const tipo = req.params.tipo;
const id = req.params.id;

const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

if(!tipoValidos.includes(tipo)){
    return resp.status(400).json({
        ok: false,
        msg: 'No es un medico u hospital'
    })
}

//validar que exista un archivo

if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
        ok: false,
        msg: 'No hay ninugn archivo'
    });
  }

  // procesar la imagen...

  const file = req.files.imagen;
  const nombreCortado = file.name.split('.');
  const extension = nombreCortado[nombreCortado.length - 1];

  //validar Extension 
  const extensionesValidas = ['png','jpg','jpeg','gif'];
  if(!extensionesValidas.includes(extension)){
      return resp.json({
          ok: false,
          msg : 'No es una extension valida'
      })
  }

  //Generar el archivo
  const nombreArchivo = `${uuidv4()}.${extension}`

  //crear el path para guardar la imagen

  const path = `./uploads/${tipo}/${nombreArchivo}`;
   // Use the mv() method to place the file somewhere on your server
   file.mv(path, (err) => {
    if (err){
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover las imagenes'
        });
    }


    //Actualizar la base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    resp.json({
        ok: true,
       msg: 'Archivo subido',
       nombreArchivo
    })
    
  });



}

const retornaImagen = (req, resp = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // SImagen por defecto 
    if(fs.existsSync(pathImg)){

        resp.sendFile(pathImg)
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        resp.sendFile(pathImg)
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}