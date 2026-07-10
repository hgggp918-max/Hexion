document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;


    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;


        const res = await fetch("/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });


        const data = await res.json();


        if (data.success) {

            alert("Giriş başarılı!");

            window.location.href = "/";

        } else {

            alert(data.message);

        }


    });

});