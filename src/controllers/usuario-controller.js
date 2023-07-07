
const Usuario = require('../models/usuario-model');
const Bcryptjs = require('bcryptjs');

const { response } = require('express');

const getUsuarios = async(req, res = response) => {
         try {
            const usuarios = await Usuario.findAll();
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al realizar el requesr'
            });
        }

}

const getUsuariosById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findByPk(id);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno, verifique log'
        });
    }
}

const crearUsuarios = async (req, res = response) => {
    try {
        const { username, password } = req.body;
        const existeEmail = await Usuario.findOne({ username });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El username ya esta registrado'
            });
        }

        // encriptar contraseña
        const salt = Bcryptjs.genSaltSync();
        req.body.password = Bcryptjs.hashSync(password, salt);
        req.body.createdBy = req.username;
        req.body.updatedBy = req.username;
        const usuario = await Usuario.create(req.body);
        res.status(200).json({
            ok: true,
            usuario: usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno, verifique log'
        });
    }

}

const actualizarUsuarios = async (req, res = response) => {
    const id = req.params.id;
     try {
        const usuarioDB = await Usuario.findByPk(id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, username, ...campos } = req.body;

        if (usuarioDB.username !== username) {
            
            const existeusername = await Usuario.findOne({ where: {username: username }});
            console.log(username)
            console.log(existeusername)
            if (existeusername) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese username'
                });
            }
        }
        campos.username = username;
        const data = await Usuario.update(campos, { where: { codUsuario: id } });
        if (data == 1) {
            res.send({
                message: `Usuario con id: ${id} actualizado exitosamente`
            });
        } else {
            res.send({
                message: `No se pudo actualizar el usuario con id: ${id}`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}



const borrarUsuarios = async (req, res = response) => {
    const id = req.params.id;
     try {
        const usuarioDB = await Usuario.findByPk(id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

    await Usuario.destroy({ where: {codUsuario: id }});
 
        return res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}



module.exports = {
    getUsuarios,
    crearUsuarios,
    getUsuariosById,
    actualizarUsuarios,
    borrarUsuarios
}