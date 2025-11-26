document.addEventListener("DOMContentLoaded", () => {

    const carrinhoKey = "carrinhoARQ";
    const pedidoKey = "pedidoARQ";

    const carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    const totalElement = document.querySelector(".total h4");
    const btnFinalizar = document.querySelector(".btn-finalizar");
    const formCartao = document.getElementById("form-cartao");

    const tituloParcelas = document.querySelectorAll(".sub-titulo")[2];
    const blocoParcelas = document.querySelectorAll(".grupo-radio.coluna")[0];

    /* ============================
       RESUMO DO PEDIDO
    ============================ */

    function resumoCarrinho() {
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

    function calcularTotal() {
        const total = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade, 0
        );

        totalElement.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
        return total;
    }

    const totalCompra = calcularTotal();

    if (carrinho.length === 0) {
        btnFinalizar.classList.add("desativado");
    }


    /* ==========================================
       BLOCO DE PARCELAS NO RESUMO
    ========================================== */

    const totalBox = document.querySelector(".total");

    const resumoParcelasBox = document.createElement("div");
    resumoParcelasBox.classList.add("resumo-parcelas");
    resumoParcelasBox.style.marginTop = "10px";
    resumoParcelasBox.style.display = "none";

    totalBox.insertAdjacentElement("beforebegin", resumoParcelasBox);

    function atualizarParcelas() {
        const metodo = document.querySelector("input[name='metodo_pagamento']:checked").value;
        const parcelaSelecionada = Number(document.querySelector("input[name='opcao-parcela']:checked").value);

        // PIX → some parcelas + título
        if (metodo === "pix") {
            resumoParcelasBox.style.display = "none";
            blocoParcelas.style.display = "none";
            tituloParcelas.style.display = "none";
            return;
        }

        // BOLETO → não deixa parcelar
        if (metodo === "boleto") {
            resumoParcelasBox.style.display = "none";
            blocoParcelas.style.display = "none";
            tituloParcelas.style.display = "none";
            return;
        }

        // CARTÃO → permite parcelamento
        blocoParcelas.style.display = "flex";
        tituloParcelas.style.display = "block";

        if (parcelaSelecionada === 0) {
            resumoParcelasBox.style.display = "none";
            return;
        }

        const valorParcela = (totalCompra / parcelaSelecionada)
            .toFixed(2)
            .replace(".", ",");

        resumoParcelasBox.style.display = "block";
        resumoParcelasBox.innerHTML = `
            <h4 style="margin: 10px 0 6px; color:#333;">Parcelamento</h4>
            <p style="
                background:#eef4f7;
                padding:10px 14px;
                border-radius:10px;
                font-weight:600;
                font-size:16px;
                color:#52778a;
                border:1px solid #d6d6d6;
                margin-bottom:12px;
            ">
                ${parcelaSelecionada}x de R$ ${valorParcela}
            </p>
        `;
    }

    document.querySelectorAll("input[name='opcao-parcela']").forEach(r => {
        r.addEventListener("change", atualizarParcelas);
    });


    /* ============================
       PIX SIMULADO
    ============================ */
    function simularPix() {

        let pixBox = document.getElementById("pixBox");

        // Se já existe, apenas mostra
        if (pixBox) {
            pixBox.style.display = "block";
            return;
        }

        pixBox = document.createElement("div");
        pixBox.id = "pixBox";
        pixBox.style.margin = "20px 0";
        pixBox.style.padding = "20px";
        pixBox.style.background = "#ffffff";
        pixBox.style.borderRadius = "16px";
        pixBox.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
        pixBox.style.textAlign = "center";

        pixBox.innerHTML = `
            <h2 style="margin-bottom:10px;">Pagamento PIX</h2>
            <p>Escaneie o QR Code para fazer o pagamento:</p>

            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SIMULACAO_PIX" 
                 alt="QR Code PIX Fake" style="margin: 15px 0">

            <p id="pixTimer" style="font-size:18px; font-weight:600; color:#658ea3">
                Expira em 60s
            </p>
        `;

        formCartao.insertAdjacentElement("afterend", pixBox);

        let tempo = 60;

        const timer = setInterval(() => {
            tempo--;
            document.getElementById("pixTimer").innerText = `Expira em ${tempo}s`;

            if (tempo <= 0) {
                clearInterval(timer);
                document.getElementById("pixTimer").innerText = `Código expirado`;
            }
        }, 1000);
    }


    /* ============================
       CONTROLE DE MÉTODOS
    ============================ */
    document.querySelectorAll("input[name='metodo_pagamento']").forEach(r => {
        r.addEventListener("change", () => {

            const metodo = r.value;

            // Cartão mostra form
            formCartao.style.display = metodo === "cartao_credito" ? "block" : "none";

            // PIX mostra simulação
            if (metodo === "pix") {
                simularPix();
            } else {
                const pixBox = document.getElementById("pixBox");
                if (pixBox) pixBox.style.display = "none";
            }

            atualizarParcelas();
        });
    });


    /* ============================
       FINALIZAR COMPRA
    ============================ */
    btnFinalizar.addEventListener("click", () => {

        if (btnFinalizar.classList.contains("desativado")) return;

        const metodo = document.querySelector("input[name='metodo_pagamento']:checked").value;
        const parcela = document.querySelector("input[name='opcao-parcela']:checked")?.value || 0;
        const entrega = document.querySelector("input[name='opcao-envio']:checked").value;

        let pagamento = "Não se aplica";

        if (metodo === "cartao_credito") {

            const nome = document.getElementById("nome-completo").value;
            const num = document.getElementById("numero-cartao").value;
            const validade = document.getElementById("validade-cartao").value;
            const cvv = document.getElementById("cvv-cartao").value;

            if (!nome || !num || !validade || !cvv) {
                alert("Preencha todos os dados do cartão.");
                return;
            }

            pagamento = {
                nomeCartao: nome,
                numeroCartao: "•••• •••• •••• " + num.slice(-4),
                validade
            };
        }

        if (metodo === "pix") {
            pagamento = "Pagamento PIX Simulado";
        }

        const pedido = {
            id: Date.now(),
            data: new Date().toLocaleString("pt-BR"),
            itens: carrinho,
            total: totalCompra,
            metodo,
            parcela,
            entrega,
            pagamento
        };

        localStorage.setItem(pedidoKey, JSON.stringify(pedido));
        localStorage.removeItem(carrinhoKey);

        window.location.href = "./finalizar-pedido.html";
    });

    atualizarParcelas();
});
