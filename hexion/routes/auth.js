const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/database");

const router = express.Router();

// Kayıt Ol
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.length < 1 || username.length > 8) {
        return res.json({
            success: false,
            message: "Kullanıcı adı 1-8 karakter olmalıdır."
        });
    }

    if (!password || password.length < 4) {
        return res.json({
            success: false,
            message: "Şifre en az 4 karakter olmalıdır."
        });
    }

    const hash = await bcrypt.hash(password, 10);

    db.run(
        "INSERT INTO users(username,password) VALUES(?,?)",
        [username, hash],
        function(err) {

            if (err) {
                return res.json({
                    success: false,
                    message: "Bu kullanıcı adı kullanılıyor."
                });
            }

            res.json({
                success: true,
                message: "Kayıt başarılı."
            });

        }
    );

});

// Dokunma Giris
router.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, user) => {

            if (!user) {
                return res.json({
                    success: false,
                    message: "Hesap bulunamadı."
                });
            }

            const ok = await bcrypt.compare(password, user.password);

            if (!ok) {
                return res.json({
                    success: false,
                    message: "Şifre yanlış."
                });
            }

            req.session.user = user.username;

            res.json({
                success: true,
                username: user.username
            });

        }
    );

});

// Hesabatan cvıkısÇıkış
router.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.json({
            success: true
        });
    });

});

// Kullanıcı Bilgisi
router.get("/me", (req, res) => {

    if (!req.session.user) {

        return res.json({
            logged: false
        });

    }

    res.json({
        logged: true,
        username: req.session.user
    });

});

module.exports = router;