import userDB from "../model/user.js"


// update
export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await userDB.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser);
    } catch (error) {
        next(error)
    }
}

// Delete
export const deleteUser = async (req, res, next) => {
    try {
        await userDB.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Record deleted" })
    } catch (error) {
        next(error);
    }
}

// get All
export const getAll = async (req, res, next) => {
    try {
        const users = await userDB.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}

// get by id
export const getById = async (req, res, next) => {
    try {
        const user = await userDB.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

