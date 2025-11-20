document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPesquisa");
    const campo = document.getElementById("campoPesquisa");
    const sugestoesBox = document.getElementById("sugestoesPesquisa");

    if (!form || !campo || !sugestoesBox) return;

    // Função de similaridade (fuzzy)
    function similaridade(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        let iguais = 0;

        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] === b[i]) iguais++;
        }

        return iguais / b.length;
    }

    // Mostrar sugestões ao digitar
    campo.addEventListener("input", () => {
        const termo = campo.value.trim().toLowerCase();
        sugestoesBox.innerHTML = "";

        if (termo.length < 1) {
            sugestoesBox.style.display = "none";
            return;
        }

        let listaSugestoes = produtos
            .filter(p => {
                const nome = p.nome.toLowerCase();
                return (
                    nome.includes(termo) ||
                    similaridade(nome, termo) >= 0.4 // fuzzy
                );
            })
            .slice(0, 6);

        if (listaSugestoes.length === 0) {
            sugestoesBox.style.display = "none";
            return;
        }

        listaSugestoes.forEach(p => {
            const item = document.createElement("div");
            item.classList.add("sugestao-item");
            item.textContent = p.nome;
            item.addEventListener("click", () => {
                campo.value = p.nome;
                sugestoesBox.style.display = "none";
                form.dispatchEvent(new Event("submit"));
            });
            sugestoesBox.appendChild(item);
        });

        sugestoesBox.style.display = "block";
    });

    // Submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const termo = campo.value.trim();
        if (termo === "") return;

        localStorage.setItem("pesquisa", termo);
        window.location.href = "home.html?scroll=catalogoSecao";
    });

    // Ocultar sugestões ao clicar fora
    document.addEventListener("click", (e) => {
        if (!form.contains(e.target)) {
            sugestoesBox.style.display = "none";
        }
    });
});
