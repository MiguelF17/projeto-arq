document.addEventListener("DOMContentLoaded", () => {
    const carrinhoKey = "carrinhoARQ";
    const container = document.querySelector(".containerCarrinho");
    const carrinhoQtd = document.getElementById("carrinhoQtd");

    // Pega produtos do localStorage
    const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    function atualizarCarrinhoQtd() {
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        carrinhoQtd.textContent = totalItens;
        carrinhoQtd.style.display = totalItens > 0 ? "inline-block" : "none";

        // animação pop
        carrinhoQtd.classList.add("mostrar");
        setTimeout(() => carrinhoQtd.classList.remove("mostrar"), 300);
    }

    atualizarCarrinhoQtd();

    function renderizarCarrinho() {
        container.innerHTML = ""; // limpa container

        carrinho.forEach((produto, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <a href="#" class="lixeira" data-index="${index}">
                    <img src="../style/icons/lixeira.png" alt="Remover">
                </a>

                <div class="imagem-produto">
                    <img src="${produto.imagem}" alt="Imagem do produto">
                </div>

                <div class="card-content">
                    <h3>${produto.nome}</h3>
                    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>

                    <div class="acoes">
                        <div class="qtd-control">
                            <button class="qtd-btn minus" data-index="${index}">-</button>
                            <input type="text" value="${produto.quantidade}" class="qtd-input" readonly>
                            <button class="qtd-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        adicionarEventos();
    }

    function adicionarEventos() {
        // Remover produto
        const lixeiras = document.querySelectorAll(".lixeira");
        lixeiras.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const index = btn.dataset.index;
                carrinho.splice(index, 1);
                localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
                renderizarCarrinho();
                atualizarCarrinhoQtd();
            });
        });

        // Aumentar ou diminuir quantidade
        const maisBtns = document.querySelectorAll(".qtd-btn.plus");
        const menosBtns = document.querySelectorAll(".qtd-btn.minus");

        maisBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                carrinho[index].quantidade++;
                localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
                renderizarCarrinho();
                atualizarCarrinhoQtd();
            });
        });

        menosBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade--;
                } else {
                    carrinho.splice(index, 1);
                }
                localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
                renderizarCarrinho();
                atualizarCarrinhoQtd();
            });
        });
    }

    renderizarCarrinho();
});
