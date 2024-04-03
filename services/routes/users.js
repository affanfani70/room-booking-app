import express from "express";
import { deleteUser, getAll, getById, updateUser } from "../controller/usersController.js";
import { verifyAdmin, verifyUser } from "../utils/verifytokon.js";


const route = express.Router()


// Update
route.put('/:id',verifyUser, updateUser)

// Delete
route.delete('/:id',verifyUser, deleteUser)


// Get by id
route.get('/:id',verifyUser, getById)


// Get all 
route.get('/',verifyAdmin, getAll)







export default route;