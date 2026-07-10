
let currentUser = null;


function showSection(id){
    document.querySelectorAll("section").forEach(section=>{
        section.classList.remove("active");
    });

    const target=document.getElementById(id);

    if(target){
        target.classList.add("active");
    }
}


function toggleChat(){

    const chat=document.getElementById("chat");

    if(chat.style.display==="flex"){
        chat.style.display="none";
    }else{
        chat.style.display="flex";
    }

}


async function register(){

    const username=document.getElementById("registerName").value.trim();
    const password=document.getElementById("registerPassword").value;

    if(username.length<1 || username.length>8){
        alert("Kullanıcı adı 1-8 karakter olmalıdır.");
        return;
    }

    if(password.length<4){
        alert("Şifre en az 4 karakter olmalıdır.");
        return;
    }

    const res=await fetch("/auth/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })

    });

    const data=await res.json();

    alert(data.message);

}


async function login(){

    const username=document.getElementById("loginName").value.trim();
    const password=document.getElementById("loginPassword").value;

    const res=await fetch("/auth/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })

    });

    const data=await res.json();

    if(data.success){

        currentUser=data.username;

        loginSuccess();

    }else{

        alert(data.message);

    }

}
// Succes Fly Oyle
function loginSuccess(){

    const right=document.querySelector(".right");

    right.innerHTML=`
    <button onclick="openMenu(event)">⋮</button>
    `;

}


function openMenu(e){

    let menu=document.getElementById("accountMenu");

    if(menu){

        menu.remove();
        return;

    }

    menu=document.createElement("div");

    menu.id="accountMenu";

    menu.style.position="absolute";
    menu.style.top="70px";
    menu.style.right="30px";
    menu.style.background="#101b2d";
    menu.style.border="1px solid #00bfff";
    menu.style.borderRadius="15px";
    menu.style.padding="10px";
    menu.style.zIndex="9999";

    menu.innerHTML=`

<button onclick="changeAccount()">🔄 Hesap Değiş</button>

<br><br>

<button onclick="logout()">🚪 Çıkış Yap</button>

`;

    document.body.appendChild(menu);

}

function changeAccount(){

    location.reload();

}

async function logout(){

    await fetch("/logout");

    location.reload();

}

// Sohbet kısmı Knk 
const aiReplies = {

"merhaba":"Merhaba 👋 Ben HEXION AI. Sana yazılım ve siber güvenlik konusunda yardımcı olabilirim.",

"selam":"Selam 👋",

"html":"HTML web sitelerinin iskeletidir.",

"css":"CSS sitenin görünümünü düzenler.",

"javascript":"JavaScript sitelere hareket kazandırır.",

"node":"Node.js sayesinde JavaScript sunucuda çalışır.",

"discord":"Discord Bot, Webhook ve API sistemleri geliştirebilirim.",

"hexion":"HEXION 3 Developers modern bir yazılım ekibidir."

};

function sendMessage(){

    if(!currentUser){

        alert("Önce giriş yapmalısın.");

        return;

    }

    const input=document.getElementById("message");

    const text=input.value.trim();

    if(text=="") return;

    const messages=document.getElementById("messages");

    messages.innerHTML+=`

<div class="msg-user">

${text}

</div>

`;

    let cevap="Bunu henüz bilmiyorum 🙂";

    const k=text.toLowerCase();

    for(let key in aiReplies){

        if(k.includes(key)){

            cevap=aiReplies[key];

            break;

        }

    }

    setTimeout(()=>{

        messages.innerHTML+=`

<div class="msg-ai">

${cevap}

</div>

`;

        messages.scrollTop=messages.scrollHeight;

    },700);

    input.value="";

}

document.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        const aktif=document.activeElement;

        if(aktif && aktif.id==="message"){

            sendMessage();

        }

    }

});



async function checkLogin(){

    try{

        const res = await fetch("/auth/me");
        const data = await res.json();

        if(data.logged){

            currentUser = data.username;

            loginSuccess();

        }

    }catch(e){

        console.log(e);

    }

}

window.onload = ()=>{

    checkLogin();

};


async function sendApplication(){

    if(!currentUser){

        alert("Önce giriş yapmalısın.");

        return;

    }

    const isim = document.getElementById("isim").value;
    const dc = document.getElementById("dc").value;
    const yas = document.getElementById("yas").value;
    const sebep = document.getElementById("sebep").value;

    const res = await fetch("/webhook",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            isim,
            dc,
            yas,
            sebep,
            user:currentUser

        })

    });

    const data = await res.json();

    alert(data.message);

}

function notify(text){

    const div=document.createElement("div");

    div.innerHTML=text;

    div.style.position="fixed";
    div.style.right="25px";
    div.style.top="100px";
    div.style.padding="15px 20px";
    div.style.background="#00bfff";
    div.style.color="black";
    div.style.fontWeight="bold";
    div.style.borderRadius="12px";
    div.style.boxShadow="0 0 25px #00bfff";
    div.style.zIndex="999999";

    document.body.appendChild(div);

    setTimeout(()=>{

        div.remove();

    },3000);

}

// Mouse Yazı Efekti
document.querySelectorAll("h1,h2,p,button").forEach(el=>{

    el.addEventListener("mouseenter",()=>{

        el.style.transform="scale(1.05)";

    });

    el.addEventListener("mouseleave",()=>{

        el.style.transform="scale(1)";

    });

});



const aiDatabase = {
    "python":"Python; otomasyon, yapay zeka ve web geliştirme için güçlü bir dildir.",
    "node.js":"Node.js JavaScript'i sunucu tarafında çalıştırır.",
    "sql":"SQL veritabanı sorgulama dilidir.",
    "linux":"Linux siber güvenlikte en çok kullanılan işletim sistemlerinden biridir.",
    "api":"API uygulamaların birbiriyle iletişim kurmasını sağlar.",
    "discord bot":"Discord botları Discord.js ile geliştirilebilir.",
    "siber güvenlik":"Siber güvenlik; sistemleri saldırılara karşı koruma sürecidir.",
    "html css":"HTML yapı, CSS tasarımdır.",
    "merhaba":"Merhaba 👋 Ben HEXION AI.",
    "selam":"Selam 😄",
    "Sa":"As Merhaba Ben Hexion Ai  Yapımcım Hz225 Bana İstediğin Kod dilini Söyleyebilirsin Cevap veririm  😄"
};


function getAIReply(text){

    const msg=text.toLowerCase();

    for(const key in aiDatabase){

        if(msg.includes(key)){

            return aiDatabase[key];

        }

    }

    return "Bu konuda henüz bilgim yok. Yakında OpenAI destekli gerçek AI eklenecek.";

}


const oldSendMessage = sendMessage;

sendMessage = function(){

    if(!currentUser){

        alert("Önce giriş yapmalısın.");

        return;

    }

    const input=document.getElementById("message");

    const value=input.value.trim();

    if(value==="") return;

    const messages=document.getElementById("messages");

    messages.innerHTML += `
<div class="msg-user">${value}</div>
`;

    setTimeout(()=>{

        messages.innerHTML += `
<div class="msg-ai">${getAIReply(value)}</div>
`;

        messages.scrollTop = messages.scrollHeight;

    },500);

    input.value="";

};

function showUsername(){

    if(!currentUser) return;

    const logo=document.querySelector(".logo");

    logo.innerHTML=`HEXION | ${currentUser}`;

}

const oldLoginSuccess = loginSuccess;

loginSuccess=function(){

    oldLoginSuccess();

    showUsername();

    notify("Hoş geldin " + currentUser + " 👋");

};


document.addEventListener("click",(e)=>{

    const menu=document.getElementById("accountMenu");

    if(!menu) return;

    if(!menu.contains(e.target) && e.target.innerText!="⋮"){

        menu.remove();

    }

});


setInterval(()=>{

    const saat=document.getElementById("clock");

    if(!saat) return;

    const d=new Date();

    saat.innerHTML=
        d.getHours().toString().padStart(2,"0")
        +":"
        +d.getMinutes().toString().padStart(2,"0")
        +":"
        +d.getSeconds().toString().padStart(2,"0");

},1000);


function typeWriter(element,text,speed=35){

    element.innerHTML="";

    let i=0;

    function yaz(){

        if(i<text.length){

            element.innerHTML+=text.charAt(i);

            i++;

            setTimeout(yaz,speed);

        }

    }

    yaz();

}


window.addEventListener("load",()=>{

    const hero=document.querySelector(".hero h1");

    if(hero){

        const txt=hero.innerText;

        typeWriter(hero,txt,25);

    }

    notify("HEXION v3 Başarıyla Yüklendi 🚀");

});


const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0px)";

        }

    });

});

document.querySelectorAll(".card").forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition=".6s";

    observer.observe(card);

});


let online=1;

setInterval(()=>{

    const durum=document.querySelector(".card:nth-child(3) p");

    if(!durum) return;

    online+=Math.floor(Math.random()*2);

    if(online>25) online=10;

    durum.innerHTML=`
HEXION ONLINE<br>
👥 ${online} Kullanıcı
`;

},5000);


document.addEventListener("mousemove",e=>{

    let glow=document.getElementById("mouseGlow");

    if(!glow){

        glow=document.createElement("div");

        glow.id="mouseGlow";

        glow.style.position="fixed";
        glow.style.width="18px";
        glow.style.height="18px";
        glow.style.borderRadius="50%";
        glow.style.background="#00bfff";
        glow.style.pointerEvents="none";
        glow.style.boxShadow="0 0 30px #00bfff";
        glow.style.zIndex="999999";

        document.body.appendChild(glow);

    }

    glow.style.left=e.clientX-9+"px";
    glow.style.top=e.clientY-9+"px";

});


document.addEventListener("keydown",e=>{

    if(e.ctrlKey && e.key.toLowerCase()=="k"){

        toggleChat();

    }

});



console.log("%cHEXION 3 Developers",
"color:#00bfff;font-size:26px;font-weight:bold;");

console.log("%cVersion 3.0",
"color:white;font-size:16px;");


function saveUser() {

    if (currentUser) {

        localStorage.setItem("hexion_user", currentUser);

    }

}

function loadUser() {

    const user = localStorage.getItem("hexion_user");

    if (user) {

        currentUser = user;

        loginSuccess();

    }

}


const oldLogin = loginSuccess;

loginSuccess = function () {

    oldLogin();

    saveUser();

    showUsername();

};

// Çıkış
const oldLogout = logout;

logout = async function () {

    localStorage.removeItem("hexion_user");

    if (oldLogout) {

        await oldLogout();

    }

};

// Yazıyo pic
function typingAI(callback) {

    const messages = document.getElementById("messages");

    const div = document.createElement("div");

    div.className = "msg-ai";

    div.innerHTML = "🤖 Yazıyor...";

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {

        div.remove();

        callback();

    }, 800);

}

const eskiSend = sendMessage;

sendMessage = function () {

    if (!currentUser) {

        alert("AI kullanmak için giriş yapmalısın.");

        return;

    }

    const input = document.getElementById("message");

    const value = input.value.trim();

    if (value == "") return;

    const messages = document.getElementById("messages");

    messages.innerHTML += `
<div class="msg-user">${value}</div>
`;

    input.value = "";

    typingAI(() => {

        messages.innerHTML += `
<div class="msg-ai">
${getAIReply(value)}
</div>
`;

        messages.scrollTop = messages.scrollHeight;

    });

};

const eskiBasvuru = sendApplication;

sendApplication = async function () {

    if (!currentUser) {

        alert("Başvuru yapmak için giriş yap.");

        return;

    }

    await eskiBasvuru();

};


window.addEventListener("load", () => {

    loadUser();

});


console.log(`
██╗  ██╗███████╗██╗  ██╗██╗ ██████╗ ███╗   ██╗
██║  ██║██╔════╝╚██╗██╔╝██║██╔═══██╗████╗  ██║
███████║█████╗   ╚███╔╝ ██║██║   ██║██╔██╗ ██║
██╔══██║██╔══╝   ██╔██╗ ██║██║   ██║██║╚██╗██║
██║  ██║███████╗██╔╝ ██╗██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
`);

console.log("HEXION 3 Developers Loaded");


let fpsEnabled = false;

document.addEventListener("keydown", e => {

    if (e.key === "F8") {

        fpsEnabled = !fpsEnabled;

        notify("FPS Gösterici : " + (fpsEnabled ? "Açık" : "Kapalı"));

    }

});


console.log("✔ AI");
console.log("✔ Login");
console.log("✔ Register");
console.log("✔ Session");
console.log("✔ Chat");
console.log("✔ Effects");
console.log("✔ HEXTION Loaded");