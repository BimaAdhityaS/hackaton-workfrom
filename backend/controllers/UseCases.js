import UseCase from '../models/UseCaseModel.js';
import Locations from '../models/LocationModel.js';
import path from "path";
import fs from "fs";
import { Op } from 'sequelize';

export const getUseCases = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        },
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const response = await UseCase.findAll({
            attributes: ['id', 'name', 'category', 'capacity', 'price', 'image', 'url'],
            where: {
                locationid: location.id
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUseCaseById = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        },
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const usecase = await UseCase.findOne({
            attributes: ['id', 'name', 'category', 'capacity', 'price', 'image', 'url'],
            where: {
                [Op.and]: [{ id: id }, { locationId: location.id }]
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(usecase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUseCase = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const { name, category, capacity, price } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext)) return res.status(400).json({ message: "Tipe file tidak diperbolehkan" });
    if (fileSize > 10000000) return res.status(400).json({ message: "Ukuran file terlalu besar" });

    file.mv(`./public/images/usecase/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ message: err.message });
        try {
            await UseCase.create({
                name,
                category,
                capacity,
                price,
                image: fileName,
                url: url,
                locationId: location.id
            })
            res.status(201).json({ message: "Use Case berhasil ditambahkan" });
        } catch (error) {
            res.status(400).json(error.message);
        }
    })
}

export const updateUseCase = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    const usecase = await UseCase.findOne({
        where: {
            id: id
        }
    })
    let fileName = "";
    if (req.files === null) {
        fileName = usecase.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        
        if (!allowedType.includes(ext)) return res.status(400).json({ message: "Tipe file tidak diperbolehkan" });
        if (fileSize > 10000000) return res.status(400).json({ message: "Ukuran file terlalu besar" });

        const filepath = `./public/images/usecase/${usecase.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/usecase/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const { name, category, capacity, price } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await UseCase.update({
            name,
            category,
            capacity,
            price,
            image: fileName,
            url:url,
            locationId: location.id
        }, {
            where: {
                id: id
            }
        })
        res.status(201).json({ message: "Use Case berhasil diperbarui" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deleteUseCase = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    const usecase = await UseCase.findOne({
        where: {
            id: id
        }
    })
    try {
        const filePath = `./public/images/usecase/${usecase.image}`;
        fs.unlinkSync(filePath);
        await UseCase.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({ message: "Use Case berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}