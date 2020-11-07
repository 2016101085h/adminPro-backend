const jwt = require('jsonwebtoken')
const validarJWT = (req, resp, next) => {
    //leer el token
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la aplicacion'
        })
    }
    try{
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(uid);
        req.uid = uid;
        next();
    }catch(error){
        resp.status(401).json({
            ok: false,
            msg: 'TOKEN no valido'
        })
    }
}
module.exports = {
    validarJWT
}