const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/database");

const router = express.Router();


router.post("/", (req,res)=>{


    const {username,password} = req.body;


    db.get(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err,user)=>{


            if(!user){

                return res.json({
                    success:false,
                    message:"Kullanıcı bulunamadı."
                });

            }


            const check = await bcrypt.compare(
                password,
                user.password
            );


            if(!check){

                return res.json({
                    success:false,
                    message:"Şifre yanlış."
                });

            }


            req.session.user = user.username;


            res.json({
                success:true,
                message:"Giriş başarılı."
            });


        }
    );


});


module.exports = router;