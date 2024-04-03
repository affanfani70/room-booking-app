import hotelDB from "../model/hotel.js";
import roomDB from "../model/room.js"

// Post/Create
export const createHotel = async (req, res, next) => {
    const hotelInfo = new hotelDB(req.body);
    try {
        const saveHotel = await hotelInfo.save();
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error)
    }
}

// update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await hotelDB.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
}

// Delete
export const deleteHotel = async (req, res, next) => {
    try {
        await hotelDB.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Record deleted" })
    } catch (error) {
        next(error);
    }
}

// get by id
export const getById = async (req, res, next) => {
    try {
        const hotel = await hotelDB.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

// get All
export const getAll = async (req, res, next) => {
    try {
        const { min, max, ...others } = req.body
        const hotels = await hotelDB.find({
            ...others,
            cheapestPrice: { $gt: min, $lt: max }
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}

// count By City
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities;
    try {
        const list = await Promise.all(cities.map(city => {
            return hotelDB.countDocuments({ city: city });
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}

// count By type
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await hotelDB.countDocuments({ type: "hotel" });
        const appartmentCount = await hotelDB.countDocuments({ type: "appartment" });
        const resortCount = await hotelDB.countDocuments({ type: "resort" });
        const villaCount = await hotelDB.countDocuments({ type: "villa" });
        const cabinCount = await hotelDB.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "appartment", count: appartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ]);
    } catch (error) {
        next(error)
    }
}

// get count by Rooms 

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await hotelDB.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return roomDB.findById(room)
        }))

        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}