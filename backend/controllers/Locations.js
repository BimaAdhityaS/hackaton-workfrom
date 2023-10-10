import Locations from "../models/LocationModel.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import { Op } from 'sequelize';

export const getLocations = async (req, res) => {
    try {
        let response;
        if (req.role === "admin" || req.role === "karyawan") {
            response = await Locations.findAll({
                attributes: ['building_id', 'name', 'city', 'address', 'description', 'open_close', 'every', 'status', 'image', 'url', 'location_url'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Locations.findAll({
                attributes: ['building_id', 'name', 'city', 'address', 'description', 'open_close', 'every', 'status', 'image', 'url', 'location_url'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getLocationById = async (req, res) => {
    try {
        const location = await Locations.findOne({
            where: {
                building_id: req.params.id
            },
        })
        if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
        let response;
        if (req.role === "admin" || req.role === "karyawan") {
            response = await Locations.findOne({
                where: {
                    id: location.id
                },
                attributes: ['building_id', 'name', 'city', 'address', 'description', 'open_close', 'every', 'status', 'image', 'url', 'location_url'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Locations.findOne({
                attributes: ['building_id', 'name', 'city', 'address', 'description', 'open_close', 'every', 'status', 'image', 'url', 'location_url'],
                where: {
                    [Op.and]: [{ id: location.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createLocation = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const { name, city, address, description, open_close, every, status, location_url } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext)) return res.status(400).json({ message: "Tipe file tidak diperbolehkan" });
    if (fileSize > 10000000) return res.status(400).json({ message: "Ukuran file terlalu besar" });

    file.mv(`./public/images/location/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Locations.create({
                name: name,
                city: city,
                address: address,
                description: description,
                open_close: open_close,
                every: every,
                status: status,
                image: fileName,
                url: url,
                location_url: location_url,
                userId: req.userId
            });
            res.status(201).json({ msg: "Lokasi atau Gedung berhasil ditambahkan" });
        } catch (error) {
            res.status(400).json(error.message);
        }
    })
}

export const updateLocation = async (req, res) => {
    const location = await Locations.findOne({
        where: {
            building_id: req.params.id
        },
    })
    if (!location) return res.status(404).json({ message: "Gedung tidak ditemukan" });
    let fileName = "";
    if (req.files === null) {
        fileName = location.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext)) return res.status(400).json({ message: "Tipe file tidak diperbolehkan" });
        if (fileSize > 10000000) return res.status(400).json({ message: "Ukuran file terlalu besar" });

        const filepath = `./public/images/location/${location.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/location/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { name, city, address, description, open_close, every, status, location_url } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Locations.update({
            name: name,
            city: city,
            address: address,
            description: description,
            open_close: open_close,
            every: every,
            status: status,
            image: fileName,
            url: url,
            location_url: location_url,
        }, {
            where: {
                id: location.id
            }
        })
        res.status(200).json({ message: "Lokasi atau Gedung berhasil di Update" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLocation = async (req, res) => {
    const location = await Locations.findOne({
        where: {
            building_id: req.params.id
        }
    });
    if (!location) return res.status(404).json({ message: "Gedung atau Lokasi tidak ditemukan" });
    try {
        const filePath = `./public/images/location/${location.image}`;
        fs.unlinkSync(filePath);
        await Locations.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: "Gedung atau lokasi berhasil di hapus" });
    } catch (error) {
        console.log(error.message);
    }
}