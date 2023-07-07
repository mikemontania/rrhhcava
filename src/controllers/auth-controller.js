const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt-helper');
const Usuario = require('../models/usuario-model');

const login = async (req, res = response) => {
    const { username, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ where: { username: username } });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un el usuario'
            });
        }
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no es valida'
            });
        }
        const token = await generarJWT(usuarioDB.codUsuario)
        res.json({
            ok: true,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}
 
const renewToken = async(req, res = response) => {
    try {
        const tokenReq = req.headers.authorization.split(" ")[1];
        const { user } = jsonwebtoken.verify(tokenReq, process.env.JWT_SECRET);
        console.log('user');
        const tokenNew = await generarJWT( user.codUsuario );
        res.status(200).json({
            ok: true,
            token:tokenNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno, verifique log'
        });
    }
}
  
module.exports = {
    login,
    renewToken
}