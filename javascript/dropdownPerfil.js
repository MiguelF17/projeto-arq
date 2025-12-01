document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelector(".icons");
    const dropdown = document.getElementById("dropdownPerfil");
    const logoutBtn = document.getElementById("logoutBtn");
    
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
});
