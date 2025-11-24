document.addEventListener("DOMContentLoaded", () => {
    // Pega a URL
    const params = new URLSearchParams(window.location.search);
    const alvo = params.get("scroll");

    // Só faz scroll se tiver parâmetro ?scroll=...
    if (alvo) {
        const elemento = document.getElementById(alvo);

        if (elemento) {
            setTimeout(() => {
                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 200); // dá tempo da página montar o layout
        }
    }
});
