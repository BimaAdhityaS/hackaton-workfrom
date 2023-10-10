import Amenities from '../models/AmenitiesModel.js';
import Locations from '../models/LocationModel.js';
import { Op } from 'sequelize';

export const getAmenities = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const amenities = await Amenities.findAll({
            attributes: ['id', 'amenity'],
            where: {
                locationId: location.id
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAmenitieById = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const amenities = await Amenities.findOne({
            attributes: ['id', 'amenity'],
            where: {
                [Op.and]: [{ id: id }, { locationId: location.id }]
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAmenitie = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    const { amenity } = req.body;
    try {
        await Amenities.create({
            amenity: amenity,
            locationId: location.id
        })
        res.status(201).json({ message: "Amenitie berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const updateAmenitie = async (req, res) => {
    const { locationid, id } = req.params;
    const { amenity } = req.body;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        await Amenities.update({
            amenity: amenity,
            where: {
                [Op.and]: [{ id: id }, { locationId: location.id }]
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        }, { where: { id: id } })
        res.status(200).json({ message: "Amenitie berhasil diupdate" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAmenitie = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        await Amenities.destroy({
            where: {
                [Op.and]: [{ id: id }, { locationId: location.id }]
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json({ message: "Amenitie berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}