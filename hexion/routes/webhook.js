const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

router.post("/", async (req, res) => {

    try{

        const { isim, dc, yas, sebep, user } = req.body;

        await fetch(WEBHOOK_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                embeds:[{

                    title:"📩 Yeni HEXION Başvurusu",

                    color:3447003,

                    fields:[

                        {
                            name:"👤 Site Hesabı",
                            value:user || "Yok"
                        },

                        {
                            name:"📛 Ad Soyad",
                            value:isim
                        },

                        {
                            name:"💬 Discord",
                            value:dc
                        },

                        {
                            name:"🎂 Yaş",
                            value:yas
                        },

                        {
                            name:"📝 Sebep",
                            value:sebep
                        }

                    ],

                    timestamp:new Date()

                }]

            })

        });

        res.json({
            success:true,
            message:"Başvurun başarıyla gönderildi."
        });

    }catch(err){

        console.log(err);

        res.json({
            success:false,
            message:"Webhook hatası."
        });

    }

});

module.exports = router;