document.addEventListener("DOMContentLoaded", () => {
    const selectJornada = document.getElementById("jornada");
    const bloqueExtra = document.getElementById("bloque-extra-laboral");
    const formulario = document.getElementById("formulario-encuesta");

    // Lógica que ya tenías para mostrar/ocultar el bloque extra
    selectJornada.addEventListener("change", function() {
        if (this.value === "si") {
            bloqueExtra.style.display = "block";
        } else {
            bloqueExtra.style.display = "none";
            const selectoresInternos = bloqueExtra.querySelectorAll("select");
            selectoresInternos.forEach(select => select.value = "");
        }
    });

    // --- NUEVO: Capturar el envío del formulario y mandarlo como JSON ---
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Recorremos el formulario y armamos un objeto nativo de JS
        const formData = new FormData(formulario);
        const objetoDatos = {};

        formData.forEach((value, key) => {
            // Si el campo tiene valor, lo agregamos al objeto
            if (value.trim() !== "") {
                objetoDatos[key] = value;
            }
        });

        // 2. Aquí pegas la URL de pruebas que te dé tu amigo (o una de Webhook.site)
        const urlServidor = 'https://encuesta-uni.onrender.com'; 

        try {
            // 3. Enviamos la petición HTTP POST con el JSON en el cuerpo (body)
            const respuesta = await fetch(urlServidor, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objetoDatos) // Convertimos el objeto JS a cadena JSON
            });

            if (respuesta.ok) {
                alert("¡Encuesta enviada con éxito vía JSON!");
                formulario.reset();
                bloqueExtra.style.display = "none";
            } else {
                alert("Error al enviar: El servidor respondió con un fallo.");
            }
        } catch (error) {
            console.error("Error de red o servidor no disponible:", error);
            alert("No se pudo conectar con el servidor de pruebas.");
        }
    });
});