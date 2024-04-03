import userDB from "../model/user.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new userDB({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).json("new user has beeb created");
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await userDB.findOne({ username: req.body.username });
        if (!user) {
            return next(errorHandler(404, "User not found"))
        }

        const passCorrect = await bcrypt.compareSync(req.body.password, user.password);
        if (!passCorrect) {
            return next(errorHandler(400, "username or Password is wrong"));
        }

        const tokon = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.KEY)
        const { password, isAdmin, ...others } = user._doc;
        res.cookie("access_tokon", tokon, { httpOnly: true }).status(200).json(others);
    } catch (error) {
        next(error)
    }
} 