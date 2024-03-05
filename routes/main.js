import express from "express";
import { readBlog , getReadById, getPost } from "../controllers/userMain.js";

const router = express.Router();

router.get('/', getPost)



// router.get('/read', readBlog);
// Route to retrieve a post by ID
router.get('/read/:id', getReadById);
export default router;