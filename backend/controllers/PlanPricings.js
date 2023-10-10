import PlanPricings from '../models/PlanPricingModel.js';
import Locations from '../models/LocationModel.js';
import { Op } from 'sequelize';

export const getPlanPricings = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const planpricings = await PlanPricings.findAll({
            attributes: ['id', 'name', 'description', 'price', 'pax'],
            where: {
                locationId: location.id
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address',]
            }]
        })
        res.status(200).json(planpricings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPlanPricingById = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        const planpricing = await PlanPricings.findOne({
            attributes: ['id', 'name', 'description', 'price', 'pax'],
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
        res.status(200).json(planpricing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPlanPricing = async (req, res) => {
    const { locationid } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    const { name, description, price, pax } = req.body;
    try {
        await PlanPricings.create({
            name: name,
            description: description,
            price: price,
            pax: pax,
            locationId: location.id
        })
        res.status(201).json({ message: "Plan Pricing berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const updatePlanPricing = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    const { name, description, price, pax } = req.body;
    try {
        await PlanPricings.update({
            name: name,
            description: description,
            price: price,
            pax: pax,
            locationId: location.id
        }, {
            where: {
                id : id
            }
        })
        res.status(201).json({ message: "Plan Pricing berhasil diupdate" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deletePlanPricing = async (req, res) => {
    const { locationid, id } = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    try {
        await PlanPricings.destroy({
            where: {
                [Op.and]: [
                    { locationId: location.id },
                    { id: id }
                ]
            }
        })
        res.status(201).json({ message: "Plan Pricing berhasil dihapus" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}