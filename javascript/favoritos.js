document.addEventListener("DOMContentLoaded", () => {
    // ===============================
    // CHECAGEM INICIAL
    // ===============================
    if (typeof produtos === "undefined") {
        console.error("Array 'produtos' não encontrado.");
        return;
    }

    const favKey = "favoritosARQ";
    const listaFav = JSON.parse(localStorage.getItem(favKey)) || [];
    const containerFavoritos = document.getElementById("containerFavoritosItems");
    const favoritosVazio = document.getElementById("favoritosVazio");

    // Verificar se a lista de favoritos está vazia
    if (listaFav.length === 0) {
        favoritosVazio.style.display = "block"; // Exibe mensagem se não houver favoritos
    } else {
        favoritosVazio.style.display = "none"; // Esconde a mensagem de favoritos vazios
        listaFav.forEach(favId => {
            const produto = produtos.find(p => p.id === favId);
            if (produto) {
                const produtoItem = document.createElement("div");
                produtoItem.classList.add("produto-item");

                produtoItem.innerHTML = `
                    <a href="visualizacao.html?id=${produto.id}">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </a>
                    <button class="remover-favorito" data-id="${produto.id}">Remover</button>
                `;

                // Adiciona o item na lista de favoritos
                containerFavoritos.appendChild(produtoItem);

                // Evento para remover do favoritos
                const btnRemover = produtoItem.querySelector(".remover-favorito");
                btnRemover.addEventListener("click", () => {
                    // Remove o produto da lista de favoritos
                    const index = listaFav.indexOf(produto.id);
                    if (index > -1) {
                        listaFav.splice(index, 1);
                        localStorage.setItem(favKey, JSON.stringify(listaFav)); // Atualiza o localStorage
                    }
                    // Remove o item da tela
                    produtoItem.remove();

                    // Se a lista ficar vazia, exibe a mensagem de "favoritos vazios"
                    if (listaFav.length === 0) {
                        favoritosVazio.style.display = "block";
                    }
                });
            }
        });
    }
});
