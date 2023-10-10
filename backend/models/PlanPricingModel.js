import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Locations from "./LocationModel.js";

const {DataTypes} = Sequelize;

const PlanPricings = db.define('planpricings',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    pax:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
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

Locations.hasMany(PlanPricings)
PlanPricings.belongsTo(Locations, {foreignKey: 'locationId'})

export default PlanPricings