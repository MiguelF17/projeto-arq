// catalogo.js (corrigido)
document.addEventListener("DOMContentLoaded", () => {

    // VARIÁVEIS INICIAIS

    if (typeof produtos === "undefined") {
        console.error("Array 'produtos' não encontrado.");
        return;
    }

    let produtosFiltrados = [...produtos];
    let paginaAtual = 1;
    const produtosPorPagina = 12;

    let categoriaSelecionada = ""; // categoria do MENU
    const tituloCatalogo = document.getElementById("tituloCatalogo");

    // Inputs do filtro (verifica se existem antes de usar)
    const precoMinInput = document.getElementById("precoMin");
    const precoMaxInput = document.getElementById("precoMax");
    const categoriaSelect = document.getElementById("categoriaSelect");
    const materialSelect = document.getElementById("materialSelect");
    const corSelect = document.getElementById("corSelect");
    const ordenarSelect = document.getElementById("ordenar");
    const aplicarFiltroBtn = document.getElementById("aplicarFiltroBtn");
    const limparFiltroBtn = document.getElementById("limparFiltroBtn");

    // safe guards (se algum input não existir, criamos um stub para evitar erros)
    function safe(el) { return el || { value: "", addEventListener: () => { }, focus: () => { } }; }
    const precoMin = safe(precoMinInput);
    const precoMax = safe(precoMaxInput);
    const catSelect = safe(categoriaSelect);
    const matSelect = safe(materialSelect);
    const corSel = safe(corSelect);
    const ordSelect = safe(ordenarSelect);

    // FUNÇÕES AUXILIARES (NORMALIZAÇÃO + LEVENSHTEIN)

    function normalizar(str) {
        if (!str) return "";
        // remove acentos, transforma em minúscula e tira caracteres especiais extras
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .trim();
    }

    function levenshtein(a, b) {
        // implementação padrão iterativa (complexidade O(len(a)*len(b)))
        if (a === b) return 0;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const v0 = new Array(b.length + 1);
        const v1 = new Array(b.length + 1);

        for (let i = 0; i <= b.length; i++) v0[i] = i;

        for (let i = 0; i < a.length; i++) {
            v1[0] = i + 1;
            for (let j = 0; j < b.length; j++) {
                const cost = a[i] === b[j] ? 0 : 1;
                v1[j + 1] = Math.min(
                    v1[j] + 1,         // insertion
                    v0[j + 1] + 1,     // deletion
                    v0[j] + cost       // substitution
                );
            }
            for (let j = 0; j <= b.length; j++) v0[j] = v1[j];
        }
        return v1[b.length];
    }

    function fuzzyMatch(name, term) {
        // name e term já devem estar normalizados antes de chamar
        if (!term) return true;
        if (name.includes(term)) return true;

        // tokenização — ajuda a encontrar partes (e.g. "sofá cinza" vs "sofa")
        const nameTokens = name.split(/\s+/);
        const termTokens = term.split(/\s+/);

        // Se algum token do name incluir o termo ou vice-versa
        for (const nt of nameTokens) {
            if (nt.includes(term) || term.includes(nt)) return true;
        }

        // Levenshtein: se distância proporcional for pequena, aceita.
        // Definimos tolerância como 40% do tamanho do termo (até 40% diferente).
        const dist = levenshtein(name, term);
        const limite = Math.max(1, Math.floor(term.length * 0.4));
        if (dist <= limite) return true;

        // Também compara token a token com distância menor
        for (const nt of nameTokens) {
            const d2 = levenshtein(nt, term);
            const lim2 = Math.max(1, Math.floor(Math.min(nt.length, term.length) * 0.4));
            if (d2 <= lim2) return true;
        }

        return false;
    }

    // RENDERIZAÇÃO DE PRODUTOS

    function renderizarProdutos(lista) {
        const grid = document.getElementById("produtosGrid");
        if (!grid) return;
        grid.innerHTML = "";

        if (!lista || lista.length === 0) {
            grid.innerHTML = `<p class="nenhum-produto">Nenhum produto encontrado</p>`;
            return;
        }

        lista.forEach(p => {
            grid.innerHTML += `
                <a href="../pages/visualizacao.html?id=${p.id}" class="card">
                    <img src="${p.imagem}" alt="${p.nome}">
                    <div class="info">
                        <h2>${p.nome}</h2>
                        <p class="price">R$ ${Number(p.preco).toFixed(2)}</p>
                        <p class="installments">Sem Juros</p>
                    </div>
                </a>
            `;
        });
    }

    // PESQUISA: usa fuzzyMatch + normalização

    (function aplicarPesquisaSeHouver() {
        const termoPesquisaRaw = localStorage.getItem("pesquisa");
        if (!termoPesquisaRaw) return;

        const termoNormalizado = normalizar(termoPesquisaRaw);
        if (tituloCatalogo) tituloCatalogo.textContent = `Resultados para: "${termoPesquisaRaw}"`;

        produtosFiltrados = produtos.filter(p => {
            const nomeNorm = normalizar(p.nome);
            // se produto tiver múltiplos materiais (array) ou cor, adaptamos; mas na sua estrutura atual são strings
            return fuzzyMatch(nomeNorm, termoNormalizado);
        });

        localStorage.removeItem("pesquisa");
        paginaAtual = 1;
        mostrarPagina(1);
    })();


    // PAGINAÇÃO

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
        if (!paginacaoDiv) return;
        paginacaoDiv.innerHTML = "";

        // botão anterior
        const botaoPrev = document.createElement("button");
        botaoPrev.textContent = "« Anterior";
        botaoPrev.disabled = paginaAtual <= 1;
        botaoPrev.onclick = () => mostrarPagina(Math.max(1, paginaAtual - 1));
        paginacaoDiv.appendChild(botaoPrev);

        // páginas próximas ao atual (janela de 5)
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
        botaoNext.onclick = () => mostrarPagina(Math.min(totalPaginas, paginaAtual + 1));
        paginacaoDiv.appendChild(botaoNext);
    }

    // Lógica de filtro / menu / eventos

    function limparCategoriaDoMenu() {
        categoriaSelecionada = "";
        // se usuário começar a usar selects, sincronizamos título
        if (tituloCatalogo && (!catSelect.value || catSelect.value === "")) {
            tituloCatalogo.textContent = "Geral";
        }
    }

    // escuta mudanças nos inputs que "desativam" a categoria do menu
    [precoMinInput, precoMaxInput, categoriaSelect, materialSelect, corSelect, ordenarSelect]
        .forEach(input => {
            if (!input) return;

            input.addEventListener("input", () => {
                // sempre que o usuário mexer em QUALQUER filtro,
                // o menu deixa de controlar a categoria
                categoriaSelecionada = "";

            });
        });


    function aplicarFiltros() {
        let filtrados = [...produtos];

        // se categoria do menu estiver definida e não houver escolha no select, usa ela
        if (categoriaSelecionada && categoriaSelecionada !== "") {
            filtrados = filtrados.filter(p => String(p.categoria).toLowerCase() === String(categoriaSelecionada).toLowerCase());
            if (catSelect) catSelect.value = categoriaSelecionada;
            if (tituloCatalogo) tituloCatalogo.textContent = categoriaSelecionada;
        }

        // se o select de categoria estiver definido, usa ele (desativa menu)
        if (catSelect && catSelect.value && catSelect.value !== "") {
            const sel = catSelect.value;
            filtrados = filtrados.filter(p => String(p.categoria).toLowerCase() === String(sel).toLowerCase());
            if (tituloCatalogo) tituloCatalogo.textContent = sel;
        }

        // preço mínimo
        const min = parseFloat(precoMinInput?.value);
        if (!isNaN(min)) filtrados = filtrados.filter(p => Number(p.preco) >= min);

        // preço máximo
        const max = parseFloat(precoMaxInput?.value);
        if (!isNaN(max)) filtrados = filtrados.filter(p => Number(p.preco) <= max);

        // material (se seus produtos puderem ter array de materiais, adaptar aqui)
        if (materialSelect && materialSelect.value && materialSelect.value !== "") {
            const m = materialSelect.value.toLowerCase();
            filtrados = filtrados.filter(p => {
                if (!p.material) return false;
                if (Array.isArray(p.material)) {
                    return p.material.map(x => String(x).toLowerCase()).includes(m);
                }
                return String(p.material).toLowerCase() === m;
            });
        }

        // cor
        if (corSelect && corSelect.value && corSelect.value !== "") {
            const c = corSelect.value.toLowerCase();
            filtrados = filtrados.filter(p => {
                if (!p.cor) return false;
                if (Array.isArray(p.cor)) {
                    return p.cor.map(x => String(x).toLowerCase()).includes(c);
                }
                return String(p.cor).toLowerCase() === c;
            });
        }

        // ordenação
        if (ordSelect && ordSelect.value) {
            switch (ordSelect.value) {
                case "menorPreco":
                    filtrados.sort((a, b) => a.preco - b.preco);
                    break;
                case "maiorPreco":
                    filtrados.sort((a, b) => b.preco - a.preco);
                    break;
                case "az":
                    filtrados.sort((a, b) => String(a.nome).localeCompare(String(b.nome)));
                    break;
                case "za":
                    filtrados.sort((a, b) => String(b.nome).localeCompare(String(a.nome)));
                    break;
            }
        }

        produtosFiltrados = filtrados;

        // título geral quando não houver filtros
        const semFiltros =
            (!categoriaSelecionada || categoriaSelecionada === "") &&
            (!catSelect || !catSelect.value || catSelect.value === "") &&
            !(precoMinInput && precoMinInput.value) &&
            !(precoMaxInput && precoMaxInput.value) &&
            !(materialSelect && materialSelect.value) &&
            !(corSelect && corSelect.value) &&
            !(ordenarSelect && ordenarSelect.value);

        if (tituloCatalogo && semFiltros) tituloCatalogo.textContent = "Geral";

        paginaAtual = 1;
        mostrarPagina(1);
    }

    if (aplicarFiltroBtn) aplicarFiltroBtn.addEventListener("click", (e) => {
        e.preventDefault();
        aplicarFiltros();
    });

    if (limparFiltroBtn) limparFiltroBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (precoMinInput) precoMinInput.value = "";
        if (precoMaxInput) precoMaxInput.value = "";
        if (categoriaSelect) categoriaSelect.value = "";
        if (materialSelect) materialSelect.value = "";
        if (corSelect) corSelect.value = "";
        if (ordenarSelect) ordenarSelect.value = "";

        categoriaSelecionada = "";
        if (tituloCatalogo) tituloCatalogo.textContent = "Geral";

        produtosFiltrados = [...produtos];
        mostrarPagina(1);
    });

    // categorias do menu principal (sincroniza com select e limpa os outros filtros)
    document.querySelectorAll(".categoria-menu").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = btn.dataset.categoria || btn.textContent.trim();
            categoriaSelecionada = cat;

            // sincroniza select (se existir)
            if (categoriaSelect) categoriaSelect.value = cat;

            // limpa outros filtros
            if (precoMinInput) precoMinInput.value = "";
            if (precoMaxInput) precoMaxInput.value = "";
            if (materialSelect) materialSelect.value = "";
            if (corSelect) corSelect.value = "";
            if (ordenarSelect) ordenarSelect.value = "";

            aplicarFiltros();

            const sec = document.querySelector("#catalogoSecao");
            if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // inicializa
    mostrarPagina(1);

});
