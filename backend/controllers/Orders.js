import Orders from "../models/OrdersModel.js";
import Locations from "../models/LocationModel.js";

export const getOrders = async (req, res) => {
    try{
        const response = await Orders.findAll({
            attributes: ['id', 'name', 'phone_number', 'email', 'company_name', 'bookplan', 'capacity', 'contactby'],
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address']
            }]
        })
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    const find = await Orders.findOne({
        where: {
            id: id
        }
    })
    if (!find) return res.status(404).json({ message: "Order tidak ditemukan" });
    try {
        const response = await Orders.findOne({
            attributes: ['id', 'name', 'phone_number', 'email', 'company_name', 'bookplan', 'capacity', 'contactby'],
            where: {
                id: id
            },
            include: [{
                model: Locations,
                attributes: ['building_id', 'name', 'address']
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const createOrder = async (req, res) => {
    const { locationid} = req.params;
    const location = await Locations.findOne({
        where: {
            building_id: locationid
        }
    })
    if (!location) return res.status(404).json({ message: "Lokasi atau Gedung tidak ditemukan" });
    const { name, phone_number,email, company_name, bookplan, capacity, contactby } = req.body;
    try {
        await Orders.create({
            name: name,
            email: email,
            phone_number: phone_number,
            company_name: company_name,
            bookplan: bookplan,
            capacity: capacity,
            contactby: contactby,
            locationId: location.id
        })
        res.status(201).json({ message: "Order berhasil dibuat" });
    } catch (error) {
        res.status(400).json(error.message);
    }

}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Order tidak ditemukan" });
    const { name, phone_number,email, company_name, bookplan, capacity, contactby } = req.body;
    try {
        await Orders.update({
            name: name,
            email: email,
            phone_number: phone_number,
            company_name: company_name,
            bookplan: bookplan,
            capacity: capacity,
            contactby: contactby,
        }, {
            where: {
                id: id
            }
        })
        res.status(201).json({ message: "Order berhasil diupdate" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await Orders.destroy({
            where: {
                id: id
            }
        })
        res.status(201).json({ message: "Order berhasil dihapus" });
    } catch (error) {
        res.status(400).json(error.message);
    }
}