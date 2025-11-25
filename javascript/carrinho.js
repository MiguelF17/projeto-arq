document.addEventListener("DOMContentLoaded", () => {
    const carrinhoKey = "carrinhoARQ";
    const container = document.querySelector(".containerCarrinho");
    const totalPrecoElement = document.getElementById("totalPreco");
    const carrinhoVazio = document.getElementById("carrinhoVazio");
    const carrinhoQtd = document.getElementById("carrinhoQtd");

    const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    function atualizarCarrinhoQtd() {
        const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);
        carrinhoQtd.textContent = totalItens > 0 ? totalItens : "";

        carrinhoQtd.style.visibility = totalItens > 0 ? "visible" : "hidden";
        carrinhoQtd.style.opacity = totalItens > 0 ? "1" : "0";
    }

    function calcularTotal() {
        const total = carrinho.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
        totalPrecoElement.textContent = total.toFixed(2).replace(".", ",");
    }

    function renderizarCarrinho() {
        container.querySelectorAll(".card").forEach(el => el.remove());

        if (carrinho.length === 0) {
            carrinhoVazio.style.display = "block";
            document.getElementById("totalContainer").style.display = "none";
            return;
        }

        carrinhoVazio.style.display = "none";
        document.getElementById("totalContainer").style.display = "block";

        carrinho.forEach((produto, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const precoTotalItem = (produto.preco * produto.quantidade).toFixed(2);

            card.innerHTML = `
                <a href="#" class="lixeira" data-index="${index}">
                    <img src="../style/icons/lixeira.png" alt="Remover">
                </a>

                <div class="imagem-produto">
                    <img src="${produto.imagem}" alt="Imagem do produto">
                </div>

                <div class="card-content">
                    <h3>${produto.nome}</h3>
                    <p class="preco">R$ ${precoTotalItem.replace(".", ",")}</p>

                    <div class="acoes">
                        <div class="qtd-control">
                            <button class="qtd-btn minus" data-index="${index}">-</button>
                            <input type="text" value="${produto.quantidade}" class="qtd-input" readonly>
                            <button class="qtd-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
            `;
            container.insertBefore(card, document.getElementById("totalContainer"));
        });

        adicionarEventos();
        calcularTotal();
    }

    function adicionarEventos() {
        document.querySelectorAll(".lixeira").forEach(btn => btn.onclick = onClickLixeira);
        document.querySelectorAll(".qtd-btn.plus").forEach(btn => btn.onclick = onClickMais);
        document.querySelectorAll(".qtd-btn.minus").forEach(btn => btn.onclick = onClickMenos);
    }

    function onClickLixeira(e) {
        e.preventDefault();
        const index = Number(this.dataset.index);
        carrinho.splice(index, 1);
        salvar();
    }

    function onClickMais() {
        const index = Number(this.dataset.index);
        carrinho[index].quantidade++;
        salvar();
    }

    function onClickMenos() {
        const index = Number(this.dataset.index);
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
        } else {
            carrinho.splice(index, 1);
        }
        salvar();
    }

    function salvar() {
        localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarCarrinhoQtd();
    }

    renderizarCarrinho();
    atualizarCarrinhoQtd();
});
