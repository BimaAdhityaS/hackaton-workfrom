import {Sequelize} from "sequelize"

const db = new Sequelize('workfrom-maxy','root','',{
    host: 'localhost',
    dialect: 'mysql',
})

export default db;