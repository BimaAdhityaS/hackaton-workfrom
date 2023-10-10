import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import LocationRoute from "./routes/LocationRoute.js";
import AmenitieRoute from "./routes/AmenitieRoute.js";
import NearbyFacilityRoute from "./routes/NearbyFacilityRoute.js";
import UseCaseRoute from "./routes/UseCaseRoute.js";
import PlanPricingRoute from "./routes/PlanPricingRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

// (async ()=>{
//     await db.sync()
// })();

const sessionStore = new SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {secure: 'auto'}
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(fileUpload())
app.use(express.static("public"));
app.use(UserRoute)
app.use(LocationRoute)
app.use(AmenitieRoute)
app.use(NearbyFacilityRoute)
app.use(UseCaseRoute)
app.use(PlanPricingRoute)
app.use(OrderRoute)
app.use(AuthRoute)

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on http://localhost:" + process.env.APP_PORT);
});