require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dbconfig');
const { populateDB } = require('./dbinit');
const morgan = require('morgan');
 // const { json } = require('express/lib/response');

// Crear el servidor de express
const app = express();
//middlewares
app.use( morgan('dev'));
app.use( express.json());
// Configurar CORS
app.use(cors()); 


// Base de datos
const dbSetup = async ()=>{
    //crea conexion
    await dbConnection();
    //inserta registros
    await populateDB();
}
dbSetup();


app.use('/api/login', require('./src/routes/auth-routes'));
app.use('/api/usuarios', require('./src/routes/usuarios-routes'));
app.use('/api/billetes', require('./src/routes/billetes-routes'));
app.use('/api/gruposiglesia', require('./src/routes/gruposIglesia-routes'));
app.use('/api/iglesias', require('./src/routes/iglesias-routes'));
app.use('/api/filiales', require('./src/routes/filiales-routes'));
app.use('/api/miembros', require('./src/routes/miembros-routes'));
app.use('/api/miembrofamilia', require('./src/routes/miembroFamilia-routes'));
app.use('/api/familias', require('./src/routes/familias-routes'));
app.use('/api/departamentos', require('./src/routes/departamento-routes'));
app.use('/api/ciudades', require('./src/routes/ciudad-routes'));
app.use('/api/barrios', require('./src/routes/barrio-routes'));
app.use('/api/estadosciviles', require('./src/routes/estadoCivil-routes'));
app.use( '/api/upload', require('./src/routes/uploads-routes') );
app.use('/api/ministerios', require('./src/routes/ministerios-routes'));
app.use('/api/ministeriomiembro', require('./src/routes/ministeriomiembro-routes'));
app.use('/api/movimientos', require('./src/routes/movimiento-routes'));
app.use('/api/conceptos', require('./src/routes/concepto-routes'));
app.use('/api/cajas', require('./src/routes/caja-routes'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});
