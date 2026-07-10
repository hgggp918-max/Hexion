const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;


        const response = await fetch("/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });


        const data = await response.json();


        if (data.success) {

            alert("Kayıt başarılı!");

            window.location.href = "/";

        } else {

            alert(data.message);

        }


    });

}