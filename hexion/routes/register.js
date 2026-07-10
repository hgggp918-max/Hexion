const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/database");

const router = express.Router();


router.post("/", async (req, res) => {

    const { username, password } = req.body;


    if (!username || !password) {
        return res.json({
            success:false,
            message:"Bilgileri doldur."
        });
    }


    const hash = await bcrypt.hash(password, 10);


    db.run(
        "INSERT INTO users(username,password) VALUES(?,?)",
        [username, hash],
        function(err){

            if(err){

                return res.json({
                    success:false,
                    message:"Bu kullanıcı zaten var."
                });

            }


            res.json({
                success:true,
                message:"Kayıt başarılı."
            });


        }
    );

});


module.exports = router;