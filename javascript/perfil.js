document.addEventListener("DOMContentLoaded", () => {
    const LOGGED_KEY = "loggedUser";

    let user = JSON.parse(localStorage.getItem(LOGGED_KEY));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Preencher campos
    function preencher() {
        nome.value = user.nome || "";
        cpf.value = user.cpf || "";
        email.value = user.email || "";
        telefone.value = user.telefone || "";

        estado.value = user.estado || "";
        cidade.value = user.cidade || "";
        bairro.value = user.bairro || "";
        rua.value = user.rua || "";
        cep.value = user.cep || "";
        numero.value = user.numero || "";
    }
    preencher();


    // Função para ativar/desativar inputs
    function setDisabled(container, disabled) {
        container.querySelectorAll("input").forEach(input => {
            input.disabled = disabled;
        });
    }

    // Seções
    const secaoPessoal = document.querySelector(".personal-info");
    const secaoEndereco = document.querySelector(".address-info");

    setDisabled(secaoPessoal, true);
    setDisabled(secaoEndereco, true);


    // ======== EDITAR PERFIL ========
    const btnEditarPerfil = document.getElementById("editarPerfil");
    const btnSalvarPerfil = document.getElementById("salvarPerfil");

    btnEditarPerfil.addEventListener("click", () => {
        setDisabled(secaoPessoal, false);
        btnEditarPerfil.style.display = "none";
        btnSalvarPerfil.style.display = "block";
    });

    btnSalvarPerfil.addEventListener("click", () => {
        user.nome = nome.value;
        user.cpf = cpf.value;
        user.email = email.value;
        user.telefone = telefone.value;

        localStorage.setItem(LOGGED_KEY, JSON.stringify(user));

        setDisabled(secaoPessoal, true);
        btnSalvarPerfil.style.display = "none";
        btnEditarPerfil.style.display = "block";

    });


    // ======== EDITAR ENDEREÇO ========
    const btnEditarEndereco = document.getElementById("editarEndereco");
    const btnSalvarEndereco = document.getElementById("salvarEndereco");

    btnEditarEndereco.addEventListener("click", () => {
        setDisabled(secaoEndereco, false);
        btnEditarEndereco.style.display = "none";
        btnSalvarEndereco.style.display = "block";
    });

    btnSalvarEndereco.addEventListener("click", () => {
        user.estado = estado.value;
        user.cidade = cidade.value;
        user.bairro = bairro.value;
        user.rua = rua.value;
        user.cep = cep.value;
        user.numero = numero.value;

        localStorage.setItem(LOGGED_KEY, JSON.stringify(user));

        setDisabled(secaoEndereco, true);
        btnSalvarEndereco.style.display = "none";
        btnEditarEndereco.style.display = "block";

    });

    // ======== FOTO DE PERFIL ======== //

    const uploadFoto = document.getElementById("uploadFoto");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const alterarFoto = document.querySelector(".alterar-foto");

    /* Carregar foto salva */
    const fotoSalva = localStorage.getItem("fotoPerfil");
    if (fotoSalva) {
        fotoPerfil.src = fotoSalva;
    }

    /* Abrir upload ao clicar no texto "Alterar foto" */
    alterarFoto.addEventListener("click", () => {
        uploadFoto.click();
    });

    /* Abrir upload ao clicar na imagem */
    fotoPerfil.addEventListener("click", () => {
        uploadFoto.click();
    });

    /* Upload */
    uploadFoto.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            fotoPerfil.src = e.target.result;
            localStorage.setItem("fotoPerfil", e.target.result);
        };
        reader.readAsDataURL(file);
    });




    // ======== LOGOUT ======== //

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem(LOGGED_KEY);
        window.location.href = "login.html";
    });
});
