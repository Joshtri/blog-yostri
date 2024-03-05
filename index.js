import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "./config/db.js";


// import postRoute from "./routes/post.js";
import mainRoute from "./routes/main.js";


dotenv.config();
const app = express();
connectDB();

// Gunakan middleware Cors
app.use(cors());
app.set('view engine', 'ejs')
app.set('views', [
   path.join(process.cwd(), 'views'), // Ubah __dirname menjadi process.cwd()
   // path.join(process.cwd(), 'views',') // Ubah __dirname menjadi process.cwd()
]);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Gunakan middleware untuk membaca JSON
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// app.use(postRoute);
app.use("/",mainRoute);

// Gunakan router untuk rute produk
// app.use(productRoute);


// Dapatkan port dari file .env
const PORT = process.env.APP_PORT;

// Mulai aplikasi pada port yang ditentukan
app.listen(PORT, () => {
   console.log(`Server running at port ${PORT}`); 
});
