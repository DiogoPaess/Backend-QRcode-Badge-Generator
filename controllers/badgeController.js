const QRcode = require("qrcode");
const { validateInput } = require("../utils/validateInput");
const Badge = require("../models/Badge");

const generateBadge = async (req, res) => {
  const { name, email, linkedin, github } = req.body;

  const validation = validateInput({ name, email, linkedin, github });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const badge = await Badge.create({
      name,
      email,
      linkedin,
      github,
    });

    const publicUrl = `http://192.168.1.136:5000/api/badge/${badge._id}`;
    const qrImage = await QRcode.toDataURL(publicUrl);

    return res.json({ qrImage, badgeId: badge._id });
  } catch {
    console.error("Erro ao gerar QR:", error);
    return res.status(500).json({ error: "QR Code generation failed" });
  }
};

const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).send("Badge não encontrado.");
    }

    res.send(`
      <html>
        <head><title>Badge de ${badge.name}</title></head>
        <body style="font-family: sans-serif; padding: 20px;">
          <h2>Informações do Crachá</h2>
          <p><strong>Nome:</strong> ${badge.name}</p>
          <p><strong>Email:</strong> ${badge.email}</p>
          <p><strong>LinkedIn:</strong> <a href="${badge.linkedin}">${badge.linkedin}</a></p>
          <p><strong>GitHub:</strong> <a href="${badge.github}">${badge.github}</a></p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Erro ao gerar QR:", error);
    return res.status(500).json({ error: "QR Code generation failed" });
  }
};

module.exports = { generateBadge, getBadgeById };
