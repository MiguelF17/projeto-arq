document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // VARIÁVEIS DO SISTEMA
    // ===============================
    let produtosFiltrados = [...produtos];
    let paginaAtual = 1;
    const produtosPorPagina = 12;

    let categoriaSelecionada = ""; // categoria do MENU
    const tituloCatalogo = document.getElementById("tituloCatalogo");

    // Inputs do filtro
    const precoMinInput = document.getElementById("precoMin");
    const precoMaxInput = document.getElementById("precoMax");
    const categoriaSelect = document.getElementById("categoriaSelect");
    const materialSelect = document.getElementById("materialSelect");
    const corSelect = document.getElementById("corSelect");
    const ordenarSelect = document.getElementById("ordenar");
    const aplicarFiltroBtn = document.getElementById("aplicarFiltroBtn");
    const limparFiltroBtn = document.getElementById("limparFiltroBtn");

    // ===============================
    // FUNÇÃO DE RENDERIZAÇÃO
    // ===============================
    function renderizarProdutos(lista) {
        const grid = document.getElementById("produtosGrid");
        grid.innerHTML = "";

        if (lista.length === 0) {
            grid.innerHTML = `<p class="nenhum-produto">Nenhum produto encontrado</p>`;
            return;
        }

        lista.forEach(p => {
            grid.innerHTML += `
                <a href="#" class="card">
                    <img src="${p.imagem}" alt="${p.nome}">
                    <div class="info">
                        <h2>${p.nome}</h2>
                        <p class="price">R$ ${p.preco.toFixed(2)}</p>
                        <p class="installments">Sem Juros</p>
                    </div>
                </a>
            `;
        });
    }

    // ===============================
    // PAGINAÇÃO
    // ===============================
    function mostrarPagina(pagina) {
        paginaAtual = pagina;

        const inicio = (pagina - 1) * produtosPorPagina;
        const fim = inicio + produtosPorPagina;

        renderizarProdutos(produtosFiltrados.slice(inicio, fim));
        gerarPaginacao();
    }

    function gerarPaginacao() {
        const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / produtosPorPagina));
        const paginacaoDiv = document.getElementById("paginacao");
        paginacaoDiv.innerHTML = "";

        // botão anterior
        const botaoPrev = document.createElement("button");
        botaoPrev.textContent = "« Anterior";
        botaoPrev.disabled = paginaAtual <= 1;
        botaoPrev.onclick = () => mostrarPagina(paginaAtual - 1);
        paginacaoDiv.appendChild(botaoPrev);

        // páginas próximas ao atual
        const start = Math.max(1, paginaAtual - 2);
        const end = Math.min(totalPaginas, paginaAtual + 2);

        for (let i = start; i <= end; i++) {
            const b = document.createElement("button");
            b.textContent = i;
            if (i === paginaAtual) b.classList.add("ativo");
            b.onclick = () => mostrarPagina(i);
            paginacaoDiv.appendChild(b);
        }

        // botão próximo
        const botaoNext = document.createElement("button");
        botaoNext.textContent = "Próximo »";
        botaoNext.disabled = paginaAtual >= totalPaginas;
        botaoNext.onclick = () => mostrarPagina(paginaAtual + 1);
        paginacaoDiv.appendChild(botaoNext);
    }

    // ===============================
    // SE O USUÁRIO MEXE NO FILTRO → IGNORA MENU
    // ===============================
    function limparCategoriaDoMenu() {
        categoriaSelecionada = "";
    }

    [precoMinInput, precoMaxInput, categoriaSelect, materialSelect, corSelect, ordenarSelect]
        .forEach(input => {
            input.addEventListener("input", limparCategoriaDoMenu);
        });

    // ===============================
    // APLICAR FILTROS
    // ===============================
    function aplicarFiltros() {
        let filtrados = [...produtos];

        // categoria do MENU
        if (categoriaSelecionada !== "") {
            filtrados = filtrados.filter(
                p => p.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
            );
            categoriaSelect.value = categoriaSelecionada;
            tituloCatalogo.textContent = categoriaSelecionada;
        }

        // categoria do SELECT
        if (categoriaSelect.value !== "") {
            filtrados = filtrados.filter(
                p => p.categoria.toLowerCase() === categoriaSelect.value.toLowerCase()
            );
            tituloCatalogo.textContent = categoriaSelect.value;
        }

        // preço mínimo
        const min = parseFloat(precoMinInput.value);
        if (!isNaN(min)) filtrados = filtrados.filter(p => p.preco >= min);

        // preço máximo
        const max = parseFloat(precoMaxInput.value);
        if (!isNaN(max)) filtrados = filtrados.filter(p => p.preco <= max);

        // material
        if (materialSelect.value !== "")
            filtrados = filtrados.filter(
                p => p.material.toLowerCase() === materialSelect.value.toLowerCase()
            );

        // cor
        if (corSelect.value !== "")
            filtrados = filtrados.filter(
                p => p.cor.toLowerCase() === corSelect.value.toLowerCase()
            );

        // ordenação
        switch (ordenarSelect.value) {
            case "menorPreco":
                filtrados.sort((a, b) => a.preco - b.preco);
                break;
            case "maiorPreco":
                filtrados.sort((a, b) => b.preco - a.preco);
                break;
            case "az":
                filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case "za":
                filtrados.sort((a, b) => b.nome.localeCompare(a.nome));
                break;
        }

        produtosFiltrados = filtrados;

        // Se nada selecionado → volta pra Geral
        if (
            categoriaSelecionada === "" &&
            categoriaSelect.value === "" &&
            !precoMinInput.value &&
            !precoMaxInput.value &&
            !materialSelect.value &&
            !corSelect.value &&
            !ordenarSelect.value
        ) {
            tituloCatalogo.textContent = "Geral";
        }

        paginaAtual = 1;
        mostrarPagina(1);
    }

    aplicarFiltroBtn.addEventListener("click", aplicarFiltros);

    // ===============================
    // LIMPAR FILTROS
    // ===============================
    limparFiltroBtn.addEventListener("click", () => {
        precoMinInput.value = "";
        precoMaxInput.value = "";
        materialSelect.value = "";
        corSelect.value = "";
        ordenarSelect.value = "";

        categoriaSelecionada = "";
        categoriaSelect.value = "";
        tituloCatalogo.textContent = "Geral";

        aplicarFiltros();
    });

    // ===============================
    // CATEGORIAS DO MENU
    // ===============================
    document.querySelectorAll(".categoria-menu").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            categoriaSelecionada = btn.dataset.categoria;

            // sincroniza com select
            categoriaSelect.value = categoriaSelecionada;

            // limpa filtros, mas mantém categoria do menu
            precoMinInput.value = "";
            precoMaxInput.value = "";
            materialSelect.value = "";
            corSelect.value = "";
            ordenarSelect.value = "";

            aplicarFiltros();

            document.querySelector("#catalogoSecao").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // carregamento inicial
    mostrarPagina(1);

});
