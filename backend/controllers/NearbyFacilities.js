import NearbyFacilities from '../models/NearbyFacilitiesModel.js';
import Locations from '../models/LocationModel.js';
import { Op } from 'sequelize';

export const getNearbyFacilites = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const nearbyfacilities = await NearbyFacilities.findAll({
            attributes: ['id', 'category', 'name', 'range', 'meter'],
            where: {
                locationId: location.id
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(nearbyfacilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNearbyFaciliteById = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const nearbyfacilities = await NearbyFacilities.findOne({
            attributes: ['id', 'category', 'name', 'range', 'meter'],
            where: {
                [Op.and]: [
                    { locationId: location.id },
                    { id: id }
                ]
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(nearbyfacilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createNearbyFacilite = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    const { category,name,range, meter } = req.body;
    try {
        await NearbyFacilities.create({
            category: category,
            name: name,
            range: range,
            meter: meter,
            locationId: location.id
        })
        res.status(201).json({ message: "NearbyFacility berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const updateNearbyFacilite = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    const { category, name, range, meter } = req.body;
    try {
        await NearbyFacilities.update({
            category: category,
            name: name,
            range: range,
            meter: meter,
            locationId: location.id
        }, {
            where: {
                [Op.and]: [
                    { locationId: location.id },
                    { id: id }
                ]
            }
        })
        res.status(200).json({ message: "NearbyFacility berhasil diupdate" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deleteNearbyFacilite= async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    try {
        await NearbyFacilities.destroy({
            where: {
                [Op.and]: [
                    { locationId: location.id },
                    { id: id }
                ]
            }
        })
        res.status(200).json({ message: "NearbyFacility berhasil dihapus" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}