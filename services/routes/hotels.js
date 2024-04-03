import express from "express";
import {
    getAll,
    createHotel,
    deleteHotel,
    getById,
    updateHotel,
    countByCity,
    countByType,
    getHotelRooms
} from "../controller/hotelsController.js";
import { verifyAdmin } from "../utils/verifytokon.js";

const route = express.Router()

// Create
route.post('/', verifyAdmin, createHotel)

// Update
route.put('/:id', verifyAdmin, updateHotel)

// Delete
route.delete('/:id', verifyAdmin, deleteHotel)

// Get by id
route.get('/find/:id', getById)


// Get all 
route.get('/', getAll)


route.get('/countByCity', countByCity)
route.get('/countByType', countByType)
route.get('/countByType', getHotelRooms)








export default route;