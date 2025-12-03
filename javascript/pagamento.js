document.addEventListener("DOMContentLoaded", () => {

    const carrinhoKey = "carrinhoARQ";
    const compraDiretaKey = "compraDiretaARQ";
    const pedidoKey = "pedidoARQ";

    const compraDireta = JSON.parse(localStorage.getItem(compraDiretaKey));
    const carrinhoLS = JSON.parse(localStorage.getItem(carrinhoKey)) || [];

    let carrinho = compraDireta ? [compraDireta] : carrinhoLS;

    const totalElement = document.querySelector(".total h4");
    const btnFinalizar = document.querySelector(".btn-finalizar");
    const formCartao = document.getElementById("form-cartao");

    const tituloParcelas = document.querySelectorAll(".sub-titulo")[2];
    const blocoParcelas = document.querySelectorAll(".grupo-radio.coluna")[0];


    /* Resumo do pedido */
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


    /* Calcular total + frete */
    function calcularTotal() {
        const totalProdutos = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );

        const frete = JSON.parse(localStorage.getItem("freteARQ"));
        const freteValor = frete ? frete.valor : 0;

        const totalFinal = totalProdutos + freteValor;

        totalElement.textContent = "Total: R$ " + totalFinal.toFixed(2).replace(".", ",");

        const blocoFrete = document.getElementById("freteResumo");
        if (blocoFrete && frete) {
            blocoFrete.innerHTML = `
                <span>Frete (${frete.cep.replace(/(\d{5})(\d{3})/, "$1-$2")})</span>
                <strong>R$ ${frete.valor.toFixed(2).replace(".", ",")}</strong>
            `;
        }

        return totalFinal;
    }

    let totalCompra = calcularTotal();

    if (carrinho.length === 0) {
        btnFinalizar.classList.add("desativado");
    }


    /* Código do frete */

    const campoCep = document.getElementById("cep");
    const btnCalcularFrete = document.getElementById("btnCalcularFrete");
    const msgFrete = document.getElementById("msgFrete");

    // Formata o CEP
    function formatarCEP(cep) {
        cep = cep.replace(/\D/g, "");
        if (cep.length > 5) cep = cep.slice(0, 5) + "-" + cep.slice(5);
        return cep;
    }

    // 🟦 tipo de frete com valor fixo
    function calcularFretePorTipo(tipo) {
        if (tipo === "retirada") return 0;
        if (tipo === "correios") return 19.90;
        if (tipo === "transportadora") return 39.90;
        return 0;
    }

    // 🟦 Carregar frete pré-calculado do visualizacao.js
    function carregarFreteSalvo() {
        const frete = JSON.parse(localStorage.getItem("freteARQ"));
        if (!frete) return;

        // Preenche o CEP automaticamente
        campoCep.value = formatarCEP(frete.cep);

        // Mantém o valor vindo de visualização.js
        msgFrete.innerText = `Frete: R$ ${frete.valor.toFixed(2).replace(".", ",")}`;
        msgFrete.style.color = "#4d6d7c";

        calcularTotal(); // recalcula o total com o frete salvo
    }

    if (campoCep) {
        campoCep.addEventListener("input", () => {
            campoCep.value = formatarCEP(campoCep.value);
        });
    }

    // 🟦 Ao clicar em calcular frete
    if (btnCalcularFrete) {
        btnCalcularFrete.addEventListener("click", () => {
            const cep = campoCep.value.replace(/\D/g, "");

            if (cep.length !== 8) {
                msgFrete.innerText = "CEP inválido.";
                msgFrete.style.color = "red";
                return;
            }

            const tipoEntrega = document.querySelector("input[name='opcao-envio']:checked").value;
            const valorFrete = calcularFretePorTipo(tipoEntrega);

            const frete = { cep, valor: valorFrete };
            localStorage.setItem("freteARQ", JSON.stringify(frete));

            msgFrete.innerText = `Frete: R$ ${valorFrete.toFixed(2).replace(".", ",")}`;
            msgFrete.style.color = "#4d6d7c";

            calcularTotal();
        });
    }

    // 🟦 Alterou o tipo de entrega → atualiza valor sem perder o CEP
    document.querySelectorAll("input[name='opcao-envio']").forEach(r => {
        r.addEventListener("change", () => {

            const freteAtual = JSON.parse(localStorage.getItem("freteARQ"));
            if (!freteAtual) return; // só troca se já tiver calculado pelo menos uma vez

            const novoValor = calcularFretePorTipo(r.value);

            freteAtual.valor = novoValor;
            localStorage.setItem("freteARQ", JSON.stringify(freteAtual));

            msgFrete.innerText = `Frete atualizado: R$ ${novoValor.toFixed(2).replace(".", ",")}`;
            msgFrete.style.color = "#4d6d7c";

            calcularTotal();
        });
    });

    // 🟦 Inicializar com frete vindo da página do produto
    carregarFreteSalvo();


    /* Bloco de parcelas */

    const totalBox = document.querySelector(".total");

    const resumoParcelasBox = document.createElement("div");
    resumoParcelasBox.classList.add("resumo-parcelas");
    resumoParcelasBox.style.marginTop = "10px";
    resumoParcelasBox.style.display = "none";

    totalBox.insertAdjacentElement("beforebegin", resumoParcelasBox);

    function atualizarParcelas() {
        const metodo = document.querySelector("input[name='metodo_pagamento']:checked").value;
        const parcelaSelecionadaInput = document.querySelector("input[name='opcao-parcela']:checked");
        const parcelaSelecionada = parcelaSelecionadaInput ? Number(parcelaSelecionadaInput.value) : 0;

        if (metodo === "pix") {
            resumoParcelasBox.style.display = "none";
            blocoParcelas.style.display = "none";
            tituloParcelas.style.display = "none";
            return;
        }

        blocoParcelas.style.display = "flex";
        tituloParcelas.style.display = "block";

        if (!parcelaSelecionada) {
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


    /* Pix simulado */
    function simularPix() {

        let pixBox = document.getElementById("pixBox");

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
            <p>Escaneie o QR Code:</p>

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
                document.getElementById("pixTimer").innerText = "Código expirado";
            }
        }, 1000);
    }


    /* Controle de métodos de pagamento */
    document.querySelectorAll("input[name='metodo_pagamento']").forEach(r => {
        r.addEventListener("change", () => {
            const metodo = r.value;

            formCartao.style.display = metodo === "cartao_credito" ? "block" : "none";

            if (metodo === "cartao_credito" || metodo === "boleto") {
                blocoParcelas.style.display = "flex";
                tituloParcelas.style.display = "block";
            }

            if (metodo === "pix") {
                blocoParcelas.style.display = "none";
                tituloParcelas.style.display = "none";
                resumoParcelasBox.style.display = "none";
            }

            if (metodo === "pix") {
                simularPix();
            } else {
                const pixBox = document.getElementById("pixBox");
                if (pixBox) pixBox.remove();
            }

            atualizarParcelas();
        });
    });


    /* Finalizar compra */
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

    window.addEventListener("beforeunload", () => {
        const finalizado = sessionStorage.getItem("pagamentoFinalizado");

        // Se não finalizou, apaga a compra direta
        if (!finalizado) {
            localStorage.removeItem("compraDiretaARQ");
        }
    });
});
