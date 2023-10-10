import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Locations = db.define('locations',{
    building_id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    open_close:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    every:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    location_url:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{type: DataTypes.STRING},
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate :{
            notEmpty: true,
        }
    }
},{
    frezeTableName: true,
})

User.hasMany(Locations)
Locations.belongsTo(User, {foreignKey: 'userId'})

export default Locations;