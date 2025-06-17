// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Servidor corriendo http://localhost:${process.env.PORT} `)
    );
  })
  .catch((err) => console.error("Error de conexión a MongoDB:", err));
