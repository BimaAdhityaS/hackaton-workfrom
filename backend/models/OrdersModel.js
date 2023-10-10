import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Locations from "./LocationModel.js";

const {DataTypes} = Sequelize;

const Orders = db.define('orders',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    company_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    bookplan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    capacity:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    contactby:{
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

Locations.hasMany(Orders)
Orders.belongsTo(Locations, {foreignKey: 'locationId'})

export default Orders