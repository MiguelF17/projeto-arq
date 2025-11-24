document.addEventListener("DOMContentLoaded", () => {

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

    // -------------------------
    //  PREENCHER INFORMAÇÕES
    // -------------------------
    document.title = "ARQ - " + produto.nome;
    produtoNome.textContent = produto.nome;
    produtoDescricao.textContent =
        `Categoria: ${produto.categoria} • Material: ${produto.material} • Cor: ${produto.cor}`;

    produtoPrecoReal.textContent = "R$ " + (produto.preco * 1.2).toFixed(2);
    produtoPrecoDesconto.textContent = "R$ " + produto.preco.toFixed(2);

    // -------------------------
    //  IMAGEM PRINCIPAL
    // -------------------------
    imgPrincipal.src = produto.imagem;

    // -------------------------
    // MINIATURAS
    // -------------------------
    const listaImagens = produto.imagens ?? [produto.imagem];
    miniaturas.innerHTML = "";

    listaImagens.forEach(src => {
        const mini = document.createElement("div");
        mini.classList.add("miniatura-item");
        mini.innerHTML = `<img src="${src}" alt="">`;

        mini.addEventListener("click", () => {
            imgPrincipal.src = src;
        });

        miniaturas.appendChild(mini);
    });

    // -------------------------
    //  DESCRIÇÃO DETALHADA
    // -------------------------
    descricaoDetalhada.textContent =
        produto.descricao || "Este produto é de alta qualidade.";

    // -------------------------
    // TAXA ENTREGA
    // -------------------------
    taxaEntrega.textContent = produto.taxaEntrega
        ? `R$ ${produto.taxaEntrega.toFixed(2)}`
        : "R$ 12.50";

    // -------------------------
    // FAVORITOS
    // -------------------------
    const favKey = "favoritosARQ";
    const listaFav = JSON.parse(localStorage.getItem(favKey)) || [];

    if (listaFav.includes(produto.id)) {
        btnFavorito.classList.add("favorito");
    }

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

    // -------------------------
    // AVALIAÇÕES
    // -------------------------
    // -------------------------
    // AVALIAÇÕES ALEATÓRIAS
    // -------------------------

    // nota média entre 4.5 e 5.0
    const mediaAleatoria = (Math.random() * 4.5 + 0.5).toFixed(1);

    // quantidade de avaliações entre 10 e 500
    const qtdAvaliacoes = Math.floor(Math.random() * 400) + 60;

    // Mostrar no HTML
    avaliacaoEstrelas.textContent = "★★★★★"; // mantém o visual
    mediaAvaliacoes.textContent = `${mediaAleatoria} (${qtdAvaliacoes} avaliações)`;


});

// ---- ZOOM COM LENTE NO MOUSE ---- //

const img = document.getElementById("imgPrincipal");
const zoomView = document.getElementById("zoomView");

const lens = document.createElement("div");
lens.classList.add("zoom-lens");
document.body.appendChild(lens); // <<< importante: segue o mouse corretamente

img.addEventListener("mouseenter", () => {
    lens.style.display = "block";
    zoomView.style.display = "block";

    zoomView.style.backgroundImage = `url(${img.src})`;
    zoomView.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
});

img.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    zoomView.style.display = "none";
});

img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();

    // posição exata do cursor na imagem
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const half = lens.offsetWidth / 2;

    // limites
    let lensX = x - half;
    let lensY = y - half;

    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > img.width - lens.offsetWidth) lensX = img.width - lens.offsetWidth;
    if (lensY > img.height - lens.offsetHeight) lensY = img.height - lens.offsetHeight;

    // >>> AQUI A LENTE FICA EXATAMENTE ONDE O MOUSE ESTÁ <<<

    lens.style.left = `${e.clientX - half}px`;
    lens.style.top = `${e.clientY - half}px`;

    // zoom sincronizado
    const zoomX = (lensX / img.width) * (img.width * 2);
    const zoomY = (lensY / img.height) * (img.height * 2);

    zoomView.style.backgroundPosition = `-${zoomX}px -${zoomY}px`;
});


document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    // ===============================
    // GERAÇÃO DINÂMICA DE TEXTO
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

    // Recomendações → produtos da mesma categoria
    function gerarRecomendados(prod) {
        const recomendados = produtos
            .filter(p => p.categoria === prod.categoria && p.id !== prod.id)
            .slice(0, 4); // no máximo 4

        if (recomendados.length === 0)
            return `<h2>Produtos Recomendados</h2><p>Nenhum similar disponível.</p>`;

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

    // Avaliações (mock simples)
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

    // FAQ gerado automaticamente de acordo com o produto
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

    // ===============================
    // INSERIR NO HTML
    // ===============================
    document.getElementById("descricaoDetalhada").innerHTML = gerarDescricao(produto);
    document.getElementById("informacoesTecnicas").innerHTML = gerarInformacoesTecnicas(produto);
    document.getElementById("produtosRecomendados").innerHTML = gerarRecomendados(produto);
    document.getElementById("avaliacoes").innerHTML = gerarAvaliacoes(produto);
    document.getElementById("faq").innerHTML = gerarFAQ(produto);

});

document.addEventListener("DOMContentLoaded", () => {
    const inputCEP = document.getElementById("cepEntrega");
    const btnCalcular = document.getElementById("calcularFrete");
    const taxaEntregaEl = document.getElementById("taxaEntrega");

    // Máscara de CEP (XXXXX-XXX)
    inputCEP.addEventListener("input", () => {
        // Remove tudo que não for número
        let valor = inputCEP.value.replace(/\D/g, "");
        // Limita a 8 dígitos
        if (valor.length > 8) valor = valor.slice(0, 8);

        // Formata com hífen
        if (valor.length > 5) {
            valor = valor.slice(0, 5) + "-" + valor.slice(5);
        }

        inputCEP.value = valor;
    });

    btnCalcular.addEventListener("click", () => {
        const cep = inputCEP.value;

        if (cep.length !== 9) {
            alert("Digite um CEP válido com 8 números.");
            return;
        }

        let taxa = 12.50;
        const prefixo = cep.substring(0, 2);

        if (["01", "02", "03", "04", "05"].includes(prefixo)) taxa = 19.90;
        else if (["06", "07", "08", "09"].includes(prefixo)) taxa = 24.90;
        else if (["10", "11", "12", "13", "14", "15"].includes(prefixo)) taxa = 34.90;

        taxaEntregaEl.textContent = `R$ ${taxa.toFixed(2)}`;
    });
});
