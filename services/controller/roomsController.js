import roomDB from "../model/room.js";
import hotelDB from "../model/hotel.js";
import { errorHandler } from "../utils/error.js";


// create 
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new roomDB(req.body);

    try {
        const saveRoom = await newRoom.save();
        try {
            await hotelDB.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } })
        } catch (error) {
            next(error)
        }

        res.status(200).json(saveRoom)
    } catch (error) {
        next(error)
    }
}

// update
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await roomDB.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await roomDB.updateOne({
            "roomNumbers._id": req.params.id
        }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })

        res.status(200).json("Room Dates is updated")
    } catch (error) {
        next(error)
    }
}

// Delete
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await roomDB.findByIdAndDelete(req.params.id)
        try {
            await hotelDB.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json({ message: "Record deleted" })
    } catch (error) {
        next(error);
    }
}

// get All
export const getAll = async (req, res, next) => {
    try {
        const rooms = await roomDB.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
}

// get by id
export const getById = async (req, res, next) => {
    try {
        const room = await roomDB.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error)
    }
}
