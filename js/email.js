document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío estándar

        const formData = new FormData(form);

        fetch("../send_email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // 🔹 Leer como texto primero
        .then(text => {
            console.log("Server Response:", text); // 🔍 Ver la respuesta exacta en consola
            return JSON.parse(text); // Luego intenta convertir a JSON
        })
        .then(data => {
            if (data.success) {
                alert("E-Mail erfolgreich gesendet!");
                localStorage.clear();
                window.location.href = "ende.html"; 
            } else {
                alert("Fehler beim Senden: " + data.error);
            }
        })
        .catch(error => {
            console.error("Fehler:", error);
            alert("Ein unerwarteter Fehler ist aufgetreten.");
        });
        
    });
});
