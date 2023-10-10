import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Locations from "./LocationModel.js";

const {DataTypes} = Sequelize;

const AmenitiesModel = db.define('amenities',{
    amenity:{
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

Locations.hasMany(AmenitiesModel)
AmenitiesModel.belongsTo(Locations, {foreignKey: 'locationId'})

export default AmenitiesModel