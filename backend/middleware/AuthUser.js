import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({message: "Login terlebih dahulu"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) return res.status(404).json({message: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if(!user) return res.status(404).json({message: "User tidak ditemukan"});
    if (user.role !== "admin" && user.role !== "karyawan") {
        return res.status(403).json({ message: "Hanya karyawan workfrom.id dan admin yang bisa mengakses halaman ini" });
    }
    next();
}