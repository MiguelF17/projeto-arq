document.addEventListener("DOMContentLoaded", () => {
    const carrinhoKey = "carrinhoARQ";
    const carrinhoQtd = document.getElementById("carrinhoQtd");
    if (!carrinhoQtd) return;

    function atualizarCarrinhoQtd() {
        const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

        carrinhoQtd.textContent = totalItens;
        carrinhoQtd.style.display = totalItens > 0 ? "inline-block" : "none";

        // Animação de pop
        carrinhoQtd.classList.add("mostrar");
        setTimeout(() => carrinhoQtd.classList.remove("mostrar"), 300); // tempo da animação em ms
    }

    // Atualiza no carregamento da página
    atualizarCarrinhoQtd();

    // Atualiza quando algum script dispara o evento
    document.addEventListener("carrinhoAtualizado", atualizarCarrinhoQtd);
});
