import express from "express";
import { createRoom, deleteRoom, getAll, getById, updateRoom, updateRoomAvailability } from "../controller/roomsController.js";
import { verifyAdmin } from "../utils/verifytokon.js";

const route = express.Router()

// Create
route.post('/:hotelId',verifyAdmin, createRoom)

// Update
route.put('/:id',verifyAdmin, updateRoom)
route.put('availability/:id', updateRoomAvailability)

// Delete
route.delete('/:id/:hotelId',verifyAdmin, deleteRoom)

// Get all 
route.get('/', getAll)

// Get by id
route.get('/:id', getById)








export default route;