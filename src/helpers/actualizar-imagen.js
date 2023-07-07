
const fs = require('fs');
const Iglesia = require('../models/iglesia-model');
const Miembro = require('../models/miembro-model');
const Usuario = require('../models/usuario-model');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}



const actualizarImagen = async (tipo, id, nombreArchivo) => {
try {
    
    let pathViejo = '';

    switch (tipo) {
        case 'miembros':
            console.log(id)
            const miembro = await Miembro.findByPk(id);
            if (!miembro) {
                console.log('No es un miembro por id');
                return false;
            }

            pathViejo = `./uploads/miembros/${miembro.img}`;
            borrarImagen(pathViejo);
            miembro.img = nombreArchivo;
            miembro.save();
            return true;

            break;

        case 'iglesias':
            const iglesia = await Iglesia.findByPk(id);
            if (!iglesia) {
                console.log('No es una iglesia por id');
                return false;
            }

            pathViejo = `./uploads/iglesias/${iglesia.img}`;
            borrarImagen(pathViejo);

            iglesia.img = nombreArchivo;
            await iglesia.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }
} catch (error) {
    console.log(error);
}


}

module.exports = {
    actualizarImagen
}
