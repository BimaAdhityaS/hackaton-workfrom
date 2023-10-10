import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Locations from "./LocationModel.js";

const {DataTypes} = Sequelize;

const NearbyFacilitiesModel= db.define('facility',{
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    range:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    meter:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
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

Locations.hasMany(NearbyFacilitiesModel)
NearbyFacilitiesModel.belongsTo(Locations, {foreignKey: 'locationId'})

export default NearbyFacilitiesModel