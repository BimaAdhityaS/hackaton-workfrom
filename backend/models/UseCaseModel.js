import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Locations from "./LocationModel.js";

const {DataTypes} = Sequelize;

const UseCaseModel = db.define('usecase',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    locationId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate :{
            notEmpty: true,
        }
    }
},{
    frezeTableName: true,
})

Locations.hasMany(UseCaseModel)
UseCaseModel.belongsTo(Locations, {foreignKey: 'locationId'})

export default UseCaseModel