const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "hexion_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/user", (req, res) => {

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

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log(" HEXION 3 Developers");
    console.log(" Server Başlatıldı");
    console.log(" http://localhost:" + PORT);
    console.log("====================================");
    console.log("");

});