document.addEventListener("DOMContentLoaded", () => {
    const carrinhoKey = "carrinhoARQ";
    const container = document.querySelector(".containerCarrinho");
    const carrinhoQtd = document.getElementById("carrinhoQtd");

    if (!carrinhoQtd) return;

    const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    function atualizarCarrinhoQtd() {
        const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);

        carrinhoQtd.textContent = totalItens > 0 ? totalItens : "";

        if (totalItens > 0) {
            carrinhoQtd.style.visibility = "visible";
            carrinhoQtd.style.opacity = "1";
            carrinhoQtd.style.transform = "scale(1)";
        } else {
            carrinhoQtd.style.visibility = "hidden";
            carrinhoQtd.style.opacity = "0";
        }
    }

    function renderizarCarrinho() {
        if (!container) return;

        container.innerHTML = "";

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
                    <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
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
        document.querySelectorAll(".lixeira").forEach(btn => {
            btn.onclick = onClickLixeira;
        });

        document.querySelectorAll(".qtd-btn.plus").forEach(btn => {
            btn.onclick = onClickMais;
        });

        document.querySelectorAll(".qtd-btn.minus").forEach(btn => {
            btn.onclick = onClickMenos;
        });
    }

    function onClickLixeira(e) {
        e.preventDefault();
        const index = Number(this.dataset.index);
        carrinho.splice(index, 1);
        localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarCarrinhoQtd();
    }

    function onClickMais() {
        const index = Number(this.dataset.index);
        carrinho[index].quantidade++;
        localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarCarrinhoQtd();
    }

    function onClickMenos() {
        const index = Number(this.dataset.index);
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
        } else {
            carrinho.splice(index, 1);
        }
        localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarCarrinhoQtd();
    }

    renderizarCarrinho();
    atualizarCarrinhoQtd();
});
