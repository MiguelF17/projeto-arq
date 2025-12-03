document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelector(".icons");
    const dropdown = document.getElementById("dropdownPerfil");
    const logoutBtn = document.getElementById("logoutBtn");
    const btnFavoritos = document.getElementById("btnFavoritos");

    let closeTimeout;

    // Mostrar dropdown ao passar o mouse
    icons.addEventListener("mouseenter", () => {
        clearTimeout(closeTimeout);
        dropdown.style.display = "flex";
    });

    // Esperar um tempo antes de fechar
    icons.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => {
            dropdown.style.display = "none";
        }, 300);
    });

    // Função global de logout
    function logoutUser() {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html";
    }

    // Chama logout ao clicar no botão
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logoutUser();
        });
    }

    // Favoritos
    if (btnFavoritos) {
        btnFavoritos.addEventListener("click", (e) => {
            e.preventDefault();

            const user = JSON.parse(localStorage.getItem("loggedUser"));

            if (!user) {
                window.location.href = "login.html";
            } else {
                window.location.href = "favoritos.html";
            }
        });
    }

    /* foto de perfil */
    const fotoPerfilHeader = document.getElementById("fotoPerfilHeader");
    const fotoSalva = localStorage.getItem("fotoPerfil");

    if (fotoPerfilHeader && fotoSalva) {
        fotoPerfilHeader.src = fotoSalva;
    }
});


