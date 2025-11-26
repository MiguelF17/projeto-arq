document.addEventListener("DOMContentLoaded", () => {

    const carrinhoKey = "carrinhoARQ";
    const pedidoKey = "pedidoARQ";

    const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    const totalElement = document.querySelector(".total h4");
    const btnFinalizar = document.querySelector(".btn-finalizar");

    // ============================================================
    // 1. RESUMO DO CARRINHO
    // ============================================================

    function resumoCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || []; // 🔧 corrigido
        const lista = document.getElementById("listaResumo");

        if (!lista) return;

        if (carrinho.length === 0) {
            lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
            return;
        }

        lista.innerHTML = "";

        carrinho.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("itemResumo");

            div.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
            `;

            lista.appendChild(div);
        });
    }

    resumoCarrinho();


    // ============================================================
    // 2. CALCULAR TOTAL DO CARRINHO
    // ============================================================

    function calcularTotal() {
        if (carrinho.length === 0) {
            totalElement.textContent = "Total: R$ 0,00";
            return 0;
        }

        const total = carrinho.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
        totalElement.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
        return total;
    }

    const totalCompra = calcularTotal();

    // Se carrinho estiver vazio, desativa botão
    if (carrinho.length === 0) {
        btnFinalizar.classList.add("desativado");
        btnFinalizar.style.pointerEvents = "none";
        btnFinalizar.style.opacity = "0.5";
        return;
    }


    // ============================================================
    // 3. CAPTURAR DADOS DO FORMULÁRIO AO FINALIZAR COMPRA
    // ============================================================

    btnFinalizar.addEventListener("click", (e) => {
        e.preventDefault();

        const metodoPagamento = document.querySelector("input[name='metodo_pagamento']:checked")?.value;
        const parcela = document.querySelector("input[name='opcao-parcela']:checked")?.value;
        const entrega = document.querySelector("input[name='opcao-envio']:checked")?.value;

        let nomeCartao = "";
        let numeroCartao = "";
        let validadeCartao = "";
        let cvvCartao = "";

        if (metodoPagamento === "cartao_credito") {
            nomeCartao = document.getElementById("nome-completo").value;
            numeroCartao = document.getElementById("numero-cartao").value;
            validadeCartao = document.getElementById("validade-cartao").value;
            cvvCartao = document.getElementById("cvv-cartao").value;

            if (!nomeCartao || !numeroCartao || !validadeCartao || !cvvCartao) {
                alert("Preencha todos os dados do cartão.");
                return;
            }

            if (numeroCartao.length < 13) {
                alert("Número de cartão inválido.");
                return;
            }
        }

        const pedido = {
            id: Date.now(),
            data: new Date().toLocaleString("pt-BR"),
            itens: carrinho,
            total: totalCompra,
            metodoPagamento,
            parcela,
            entrega,
            pagamento: metodoPagamento === "cartao_credito" ? {
                nomeCartao,
                numeroCartao: "•••• •••• •••• " + numeroCartao.slice(-4),
                validadeCartao
            } : "Não se aplica"
        };

        localStorage.setItem(pedidoKey, JSON.stringify(pedido));
        localStorage.removeItem(carrinhoKey);

        window.location.href = "./finalizar-pedido.html";
    });

});
