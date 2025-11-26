document.addEventListener("DOMContentLoaded", () => {
    // ===============================
    // CHECAGEM INICIAL
    // ===============================
    if (typeof produtos === "undefined") {
        console.error("Array 'produtos' não encontrado.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        console.error("Produto não encontrado.");
        document.getElementById("produtoContainer").innerHTML = "<h2>Produto não encontrado.</h2>";
        return;
    }

    // ===============================
    // ELEMENTOS
    // ===============================
    const produtoNome = document.getElementById("produtoNome");
    const produtoDescricao = document.getElementById("produtoDescricao");
    const produtoPrecoReal = document.getElementById("produtoPrecoReal");
    const produtoPrecoDesconto = document.getElementById("produtoPrecoDesconto");
    const imgPrincipal = document.getElementById("imgPrincipal");
    const miniaturas = document.getElementById("miniaturas");
    const descricaoDetalhada = document.getElementById("descricaoDetalhada");
    const taxaEntrega = document.getElementById("taxaEntrega");
    const btnFavorito = document.getElementById("btnFavorito");
    const avaliacaoEstrelas = document.getElementById("avaliacaoEstrelas");
    const mediaAvaliacoes = document.getElementById("mediaAvaliacoes");
    const btnAdicionarCarrinho = document.getElementById("btn-carrinho");
    const carrinhoKey = "carrinhoARQ"; // localStorage

    // ===============================
    // PREENCHER INFORMAÇÕES
    // ===============================
    document.title = "ARQ - " + produto.nome;
    produtoNome.textContent = produto.nome;
    produtoDescricao.textContent = `Categoria: ${produto.categoria} • Material: ${produto.material} • Cor: ${produto.cor}`;
    produtoPrecoReal.textContent = "R$ " + (produto.preco * 1.2).toFixed(2);
    produtoPrecoDesconto.textContent = "R$ " + produto.preco.toFixed(2);

    // ===============================
    // IMAGEM PRINCIPAL + MINIATURAS
    // ===============================
    imgPrincipal.src = produto.imagem;
    const listaImagens = produto.imagens ?? [produto.imagem];
    miniaturas.innerHTML = "";

    listaImagens.forEach(src => {
        const mini = document.createElement("div");
        mini.classList.add("miniatura-item");
        mini.innerHTML = `<img src="${src}" alt="">`;
        mini.addEventListener("click", () => imgPrincipal.src = src);
        miniaturas.appendChild(mini);
    });

    // ===============================
    // DESCRIÇÃO DETALHADA
    // ===============================
    descricaoDetalhada.textContent = produto.descricao || "Este produto é de alta qualidade.";

    // ===============================
    // TAXA ENTREGA
    // ===============================
    taxaEntrega.textContent = produto.taxaEntrega ? `R$ ${produto.taxaEntrega.toFixed(2)}` : "R$ 12.50";

    // ===============================
    // FAVORITOS
    // ===============================
    const favKey = "favoritosARQ";
    const listaFav = JSON.parse(localStorage.getItem(favKey)) || [];
    if (listaFav.includes(produto.id)) btnFavorito.classList.add("favorito");

    btnFavorito.addEventListener("click", () => {
        btnFavorito.classList.add("pop");
        setTimeout(() => btnFavorito.classList.remove("pop"), 200);

        if (!listaFav.includes(produto.id)) {
            listaFav.push(produto.id);
            btnFavorito.classList.add("favorito");
        } else {
            const i = listaFav.indexOf(produto.id);
            listaFav.splice(i, 1);
            btnFavorito.classList.remove("favorito");
        }
        localStorage.setItem(favKey, JSON.stringify(listaFav));
    });

    // ===============================
    // AVALIAÇÕES ALEATÓRIAS
    // ===============================
    const mediaAleatoria = (Math.random() * 1.5 + 3.5).toFixed(1);
    const qtdAvaliacoes = Math.floor(Math.random() * 491) + 10;

    function gerarEstrelasInteiras(nota) {
        const arredondada = Math.round(nota);
        return "★".repeat(arredondada) + "☆".repeat(5 - arredondada);
    }

    avaliacaoEstrelas.textContent = gerarEstrelasInteiras(mediaAleatoria);
    mediaAvaliacoes.textContent = `${mediaAleatoria} (${qtdAvaliacoes} avaliações)`;


    /// ===============================
    // COMPRAR
    // ===============================

    const btnComprar = document.getElementById("btn-comprar");

    btnComprar.addEventListener("click", () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        if (!loggedUser) {
            alert("Você precisa estar logado para finalizar a compra.");
            window.location.href = "login.html";
            return;
        }

        // Salvar o produto atual como "compra imediata"
        const compraKey = "compraDiretaARQ";

        const compraDireta = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        };

        localStorage.setItem(compraKey, JSON.stringify(compraDireta));

        // Ir para a página de pagamento
        window.location.href = "pagamento.html";
    });


    /// ===============================
    // CARRINHO
    // ===============================

    // Adiciona evento ao botão de carrinho
    btnAdicionarCarrinho.addEventListener("click", () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (!loggedUser) {
            alert("Você precisa estar logado para adicionar produtos ao carrinho.");
            window.location.href = "login.html";
            return;
        }

        let carrinho = JSON.parse(localStorage.getItem(carrinhoKey)) || [];
        const index = carrinho.findIndex(p => p.id === produto.id);

        if (index > -1) {
            carrinho[index].quantidade += 1;
        } else {
            carrinho.push({
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: 1
            });
        }

        localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));

        // Atualiza o badge imediatamente
        const carrinhoQtd = document.getElementById("carrinhoQtd");
        const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);

        carrinhoQtd.textContent = totalItens > 0 ? totalItens : "";
        carrinhoQtd.style.visibility = "visible";
        carrinhoQtd.style.opacity = "1";

        // Animação do badge
        carrinhoQtd.classList.add("pop");
        setTimeout(() => carrinhoQtd.classList.remove("pop"), 300);


    });



    // ===============================
    // GERAÇÃO DE HTML DINÂMICO
    // ===============================
    function gerarDescricao(prod) {
        return `
            <p>${prod.nome} é um produto da categoria ${prod.categoria.toLowerCase()} projetado para oferecer conforto e estilo.</p>
            <p>Feito em <strong>${prod.material}</strong> e disponível na cor <strong>${prod.cor}</strong>, ele combina perfeitamente com diversos ambientes.</p>
            <p>Ideal para quem busca qualidade, durabilidade e um toque moderno para o lar.</p>
        `;
    }

    function gerarInformacoesTecnicas(prod) {
        return `
            <h2>Informações Técnicas</h2>
            <ul>
                <li><strong>Nome:</strong> ${prod.nome}</li>
                <li><strong>Categoria:</strong> ${prod.categoria}</li>
                <li><strong>Material:</strong> ${prod.material}</li>
                <li><strong>Cor:</strong> ${prod.cor}</li>
            </ul>
        `;
    }

    function gerarRecomendados(prod) {
        const recomendados = produtos.filter(p => p.categoria === prod.categoria && p.id !== prod.id).slice(0, 4);
        if (!recomendados.length) return `<h2>Produtos Recomendados</h2><p>Nenhum similar disponível.</p>`;
        let html = `<h2>Produtos Recomendados</h2><div class="recomendados-container">`;
        recomendados.forEach(r => {
            html += `
                <a class="recomendado-card" href="visualizacao.html?id=${r.id}">
                    <img src="${r.imagem}" alt="${r.nome}">
                    <h3>${r.nome}</h3>
                    <p>R$ ${r.preco.toFixed(2)}</p>
                </a>
            `;
        });
        html += "</div>";
        return html;
    }

    function gerarAvaliacoes(prod) {
        const avaliacoesFake = [
            { nome: "Maria L.", nota: 5, texto: "Ótima qualidade!" },
            { nome: "João P.", nota: 4, texto: "Muito confortável e bonito." },
            { nome: "Carla M.", nota: 5, texto: "Superou as expectativas!" }
        ];
        let html = `<h2>Avaliações</h2>`;
        avaliacoesFake.forEach(a => {
            html += `
                <div class="avaliacao">
                    <strong>${a.nome}</strong>
                    <span>${"★".repeat(a.nota)}</span>
                    <p>${a.texto}</p>
                </div>
            `;
        });
        return html;
    }

    function gerarFAQ(prod) {
        return `
            <h2>Perguntas Frequentes</h2>
            <div class="faq-item">
                <h3>O material é resistente?</h3>
                <p>Sim! O produto é feito em <strong>${prod.material}</strong>, garantindo boa durabilidade.</p>
            </div>
            <div class="faq-item">
                <h3>A cor ${prod.cor.toLowerCase()} combina com quais ambientes?</h3>
                <p>A cor ${prod.cor.toLowerCase()} é versátil e combina com diversos estilos de decoração.</p>
            </div>
            <div class="faq-item">
                <h3>Esse produto pertence a qual categoria?</h3>
                <p>Ele faz parte da categoria <strong>${prod.categoria}</strong>.</p>
            </div>
            <div class="faq-item">
                <h3>O produto precisa de montagem?</h3>
                <p>Dependendo do modelo, pode ser necessária uma montagem simples.</p>
            </div>
        `;
    }

    document.getElementById("descricaoDetalhada").innerHTML = gerarDescricao(produto);
    document.getElementById("informacoesTecnicas").innerHTML = gerarInformacoesTecnicas(produto);
    document.getElementById("produtosRecomendados").innerHTML = gerarRecomendados(produto);
    document.getElementById("avaliacoes").innerHTML = gerarAvaliacoes(produto);
    document.getElementById("faq").innerHTML = gerarFAQ(produto);

    // ===============================
    // ZOOM COM LENTE
    // ===============================
    const zoomView = document.getElementById("zoomView");
    const lens = document.createElement("div");
    lens.classList.add("zoom-lens");
    document.body.appendChild(lens);

    imgPrincipal.addEventListener("mouseenter", () => {
        lens.style.display = "block";
        zoomView.style.display = "block";
        zoomView.style.backgroundImage = `url(${imgPrincipal.src})`;
        zoomView.style.backgroundSize = `${imgPrincipal.width * 2}px ${imgPrincipal.height * 2}px`;
    });

    imgPrincipal.addEventListener("mouseleave", () => {
        lens.style.display = "none";
        zoomView.style.display = "none";
    });

    imgPrincipal.addEventListener("mousemove", (e) => {
        const rect = imgPrincipal.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const half = lens.offsetWidth / 2;

        let lensX = x - half;
        let lensY = y - half;

        if (lensX < 0) lensX = 0;
        if (lensY < 0) lensY = 0;
        if (lensX > imgPrincipal.width - lens.offsetWidth) lensX = imgPrincipal.width - lens.offsetWidth;
        if (lensY > imgPrincipal.height - lens.offsetHeight) lensY = imgPrincipal.height - lens.offsetHeight;

        lens.style.left = `${e.clientX - half}px`;
        lens.style.top = `${e.clientY - half}px`;

        const zoomX = (lensX / imgPrincipal.width) * (imgPrincipal.width * 2);
        const zoomY = (lensY / imgPrincipal.height) * (imgPrincipal.height * 2);

        zoomView.style.backgroundPosition = `-${zoomX}px -${zoomY}px`;
    });

    // ===============================
    // CÁLCULO DE FRETE
    // ===============================
    const inputCEP = document.getElementById("cepEntrega");
    const btnCalcular = document.getElementById("calcularFrete");

    inputCEP.addEventListener("input", () => {
        let valor = inputCEP.value.replace(/\D/g, "");
        if (valor.length > 8) valor = valor.slice(0, 8);
        if (valor.length > 5) valor = valor.slice(0, 5) + "-" + valor.slice(5);
        inputCEP.value = valor;
    });

    btnCalcular.addEventListener("click", () => {
        const cep = inputCEP.value;
        if (cep.length !== 9) return alert("Digite um CEP válido com 8 números.");

        let taxa = 12.50;
        const prefixo = cep.substring(0, 2);

        if (["01", "02", "03", "04", "05"].includes(prefixo)) taxa = 19.90;
        else if (["06", "07", "08", "09"].includes(prefixo)) taxa = 24.90;
        else if (["10", "11", "12", "13", "14", "15"].includes(prefixo)) taxa = 34.90;

        taxaEntrega.textContent = `R$ ${taxa.toFixed(2)}`;

        localStorage.setItem("freteARQ", JSON.stringify({
            cep,
            valor: taxa
        }));
    });
});
