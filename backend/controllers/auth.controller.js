const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const user = new User({ usuario, contrasena });
    await user.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    res.status(400).json({ error: "Error al registrar usuario" });
  }
};

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const user = await User.findOne({ usuario });
    if (!user || user.contrasena !== contrasena) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.json({ message: "Login exitoso" });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};
