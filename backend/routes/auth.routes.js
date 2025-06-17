// auth.routes.js

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena)
    return res.status(400).json({ message: "Faltan datos" });

  try {
    const yaExiste = await User.findOne({ usuario });
    if (yaExiste)
      return res.status(409).json({ message: "El usuario ya existe" });

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new User({
      usuario,
      contrasena: hash,
    });

    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const user = await User.findOne({ usuario });
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const esValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!esValida)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Podés agregar JWT real si querés
    res.status(200).json({ token: "fake-jwt-token" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
