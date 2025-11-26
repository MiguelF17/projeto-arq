document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // VALIDAR PRODUTO
    // ===============================
    if (typeof produtos === "undefined") {
        console.error("Array 'produtos' não encontrado.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
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
    const btnComprar = document.getElementById("btn-comprar");

    const carrinhoKey = "carrinhoARQ";
    const compraKey = "compraDiretaARQ";

    // ===============================
    // PREENCHER INFORMAÇÕES
    // ===============================
    document.title = "ARQ - " + produto.nome;
    produtoNome.textContent = produto.nome;
    produtoDescricao.textContent = `Categoria: ${produto.categoria} • Material: ${produto.material} • Cor: ${produto.cor}`;
    produtoPrecoReal.textContent = "R$ " + (produto.preco * 1.2).toFixed(2);
    produtoPrecoDesconto.textContent = "R$ " + produto.preco.toFixed(2);

    // ===============================
    // IMAGENS
    // ===============================
    imgPrincipal.src = produto.imagem;
    const listaImagens = produto.imagens ?? [produto.imagem];

    miniaturas.innerHTML = "";
    listaImagens.forEach(src => {
        const mini = document.createElement("div");
        mini.classList.add("miniatura-item");
        mini.innerHTML = `<img src="${src}">`;
        mini.addEventListener("click", () => imgPrincipal.src = src);
        miniaturas.appendChild(mini);
    });

    // ===============================
    // DESCRIÇÃO
    // ===============================
    descricaoDetalhada.textContent = produto.descricao || "Produto de alta qualidade.";

    // ===============================
    // ENTREGA
    // ===============================
    taxaEntrega.textContent = produto.taxaEntrega
        ? `R$ ${produto.taxaEntrega.toFixed(2)}`
        : "R$ 12.50";

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
            listaFav.splice(listaFav.indexOf(produto.id), 1);
            btnFavorito.classList.remove("favorito");
        }
        localStorage.setItem(favKey, JSON.stringify(listaFav));
    });

    // ===============================
    // AVALIAÇÕES FAKE
    // ===============================
    const mediaAleatoria = (Math.random() * 1.5 + 3.5).toFixed(1);
    const qtdAvaliacoes = Math.floor(Math.random() * 491) + 10;

    avaliacaoEstrelas.textContent = "★".repeat(Math.round(mediaAleatoria));
    mediaAvaliacoes.textContent = `${mediaAleatoria} (${qtdAvaliacoes} avaliações)`;

    // ===============================
    // BOTÃO COMPRAR (compra direta)
    // ===============================
    btnComprar.addEventListener("click", () => {
        const logged = JSON.parse(localStorage.getItem("loggedUser"));
        if (!logged) {
            alert("Você precisa estar logado para comprar.");
            window.location.href = "login.html";
            return;
        }

        const compraDireta = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        };

        localStorage.setItem(compraKey, JSON.stringify(compraDireta));

        window.location.href = "pagamento.html";
    });

    // ===============================
    // ADICIONAR AO CARRINHO
    // ===============================
    btnAdicionarCarrinho.addEventListener("click", () => {
        const logged = JSON.parse(localStorage.getItem("loggedUser"));
        if (!logged) {
            alert("Você precisa estar logado para adicionar ao carrinho.");
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

        atualizarBadgeCarrinho(carrinho);
    });

    function atualizarBadgeCarrinho(carrinho) {
        const carrinhoQtd = document.getElementById("carrinhoQtd");
        const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

        carrinhoQtd.textContent = total > 0 ? total : "";
        carrinhoQtd.style.visibility = "visible";
        carrinhoQtd.style.opacity = "1";

        carrinhoQtd.classList.add("pop");
        setTimeout(() => carrinhoQtd.classList.remove("pop"), 300);
    }

    // ===============================
    // SEÇÕES DINÂMICAS
    // ===============================
    function gerarDescricao(prod) {
        return `
            <p>${prod.nome} é um produto da categoria ${prod.categoria.toLowerCase()}.</p>
            <p>Material: <strong>${prod.material}</strong>. Cor: <strong>${prod.cor}</strong>.</p>
        `;
    }

    function gerarInformacoes(prod) {
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

    function gerarFAQ(prod) {
        return `
            <h2>Perguntas Frequentes</h2>
            <div class="faq-item">
                <h3>O material é resistente?</h3>
                <p>Sim! Feito em ${prod.material} de ótima durabilidade.</p>
            </div>
        `;
    }

    document.getElementById("informacoesTecnicas").innerHTML = gerarInformacoes(produto);
    document.getElementById("faq").innerHTML = gerarFAQ(produto);

});
