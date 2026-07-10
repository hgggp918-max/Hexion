const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

    const { message } = req.body;

    const text = (message || "").toLowerCase();

    let reply = "Eğer Size Cevap Veremediysem belirli kalıplar Dışında Malesef Veremiyorumdur Gelecek Sürümde Daha iyi Olacağıma Söz veriyorum.";

    if (text.includes("merhaba"))
        reply = "Merhaba 👋 Ben HEXION AI.";

    else if (text.includes("html"))
        reply = "HTML web sitelerinin iskeletidir.";

    else if (text.includes("css"))
        reply = "CSS sitenin tasarımını oluşturur.";

    else if (text.includes("javascript"))
        reply = "JavaScript sitelere hareket kazandırır.";

    else if (text.includes("node"))
        reply = "Node.js ile JavaScript sunucu tarafında çalışır.";

    else if (text.includes("python"))
        reply = "Python yapay zeka ve otomasyon için çok güçlüdür.";

    res.json({
        success: true,
        reply
    });

});

module.exports = router;