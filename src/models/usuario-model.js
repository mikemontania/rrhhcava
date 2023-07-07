const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const moment = require('moment');
const Iglesia = require('./iglesia-model');
const Filial = require('./filial-model');

class Usuario extends Model { }
Usuario.init({
  codUsuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  codIglesia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codFilial: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  img: {
    type: DataTypes.STRING(100)
  },
  nombre: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  bloqueado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  intentosFallidos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  createdBy: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'AUTO_GENERADO'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'AUTO_GENERADO'
  },
}, {
  sequelize,
  modelName: 'Usuario',
  scopes: {
    withPassword: {
      attributes: {},
    },
    withoutPassword: {
      attributes: { exclude: ['password'] },
    }
  },
  // defaultScope: {
  //   attributes: { exclude: ['password'] },
  // },
  // don't forget to enable timestamps!
  timestamps: true,
  // I don't want createdAt
  //createdAt: 'fechaCreacion',
  // I want updatedAt to actually be called fechaModificacion
  //createdAt: 'fechaModificacion',
  // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
  //deletedAt: 'destroyTime',
  //paranoid: true,
  //si timestamp = true interpreta que existen columnas created_at, modified_at para controlar la fecha/hora de los registros
  // timestamps: false, //default true
  underscored: true //BD con snake_case: cod_usuario, por default iguala todo
});
Usuario.belongsTo(Iglesia, { as: "iglesia", foreignKey: "codIglesia" });
Usuario.belongsTo(Filial, { as: "filial", foreignKey: "codFilial" });


module.exports = Usuario;