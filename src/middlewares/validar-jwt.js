const jsonwebtoken = require('jsonwebtoken');

const validarJWT = (req, res , next) => {

    let token = null;
    if (req.headers.authorization &&req.headers.authorization.split(" ")[0] === "Bearer") {
        token =  req.headers.authorization.split(" ")[1];
      } 
 
    // console.log(token); 
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.codUsuario = user.codUsuario;
        req.username = user.username;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


}

module.exports = {
    validarJWT
}