const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario-model');

const generarJWT = async(  codUsuario  ) =>{

const usuario = await Usuario.findByPk(codUsuario);
return new Promise((resolve, reject)=>{
    const payload ={
        user: {
            codUsuario: usuario.codUsuario,
            nombre: usuario.nombre,
            username: usuario.username,
            codIglesia:usuario.codIglesia,
            codFilial:usuario.codFilial,
            role: 'ADMIN'
        }
    }

jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn:'24h'
},(err, token)=>{

    if (err) {
        console.log(err);
        reject(err);
    }else{
        resolve(token);
    }
});
});


}

module.exports = {
    generarJWT,
};