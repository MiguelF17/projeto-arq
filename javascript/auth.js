// ===============================================
// SISTEMA DE AUTENTICAÇÃO - ARQ
// Cadastro em 3 etapas, login, perfil, logout
// ===============================================

// --- LOCAL STORAGE KEYS ---
const TEMP_USER_KEY = "tempUserData";
const USER_KEY = "userData";
const LOGGED_KEY = "loggedUser";

// ======================================================
//                VERIFICA LOGIN GLOBAL + SAUDAÇÃO
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    const perfilBtn = document.getElementById("btnPerfil");
    const saudacao = document.getElementById("saudacaoPerfil");

    const usuarioLogado = JSON.parse(localStorage.getItem(LOGGED_KEY));

    if (perfilBtn) {
        perfilBtn.href = usuarioLogado ? "perfil.html" : "login.html";
    }

    if (saudacao && usuarioLogado && window.location.pathname.includes("home.html")) {
        saudacao.textContent = `Olá, ${usuarioLogado.nome}`;
    }

    carregarDadosPerfil();
});

// ======================================================
//                    ETAPA 1 DO CADASTRO
// ======================================================
const etapa1 = document.getElementById("cadastroEtapa1");

if (etapa1) {
    etapa1.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const cemail = document.getElementById("cemail").value.trim();
        const telefone = document.getElementById("telefone").value.trim();

        if (email !== cemail) {
            alert("Os e-mails não coincidem.");
            return;
        }

        const tempData = { nome, email, telefone };
        localStorage.setItem(TEMP_USER_KEY, JSON.stringify(tempData));

        window.location.href = "cadastro2.html";
    });
}

// ======================================================
//          MÁSCARAS → CPF, CEP e TELEFONE
// ======================================================
document.addEventListener("input", (e) => {
    let input = e.target;

    // TELEFONE
    if (input.id === "telefone") {
        input.value = input.value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .substring(0, 15);
    }

    // CPF
    if (input.id === "cpf") {
        input.value = input.value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .substring(0, 14);
    }

    // CEP
    if (input.id === "cep") {
        input.value = input.value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .substring(0, 9);
    }
});

// ======================================================
//         BUSCA AUTOMÁTICA DE ENDEREÇO PELO CEP
// ======================================================
const cepInput = document.getElementById("cep");

if (cepInput) {
    cepInput.addEventListener("blur", async () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length === 8) {
            try {
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dados = await resposta.json();

                if (dados.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                document.getElementById("rua").value = dados.logradouro;
                document.getElementById("bairro").value = dados.bairro;
                document.getElementById("cidade").value = dados.localidade;
                document.getElementById("estado").value = dados.uf;
            } catch (err) {
                alert("Erro ao buscar CEP.");
            }
        }
    });
}

// ======================================================
//                    ETAPA 2 DO CADASTRO
// ======================================================
const etapa2 = document.getElementById("cadastroEtapa2");

if (etapa2) {
    etapa2.addEventListener("submit", (e) => {
        e.preventDefault();

        const tempData = JSON.parse(localStorage.getItem(TEMP_USER_KEY));

        if (!tempData) {
            alert("Erro: volte para a primeira etapa.");
            window.location.href = "cadastro.html";
            return;
        }

        const cpf = document.getElementById("cpf").value;
        const cep = document.getElementById("cep").value;
        const rua = document.getElementById("rua").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const numero = document.getElementById("numero").value;

        tempData.cpf = cpf;
        tempData.cep = cep;
        tempData.rua = rua;
        tempData.bairro = bairro;
        tempData.cidade = cidade;
        tempData.estado = estado;
        tempData.numero = numero;


        localStorage.setItem(TEMP_USER_KEY, JSON.stringify(tempData));

        window.location.href = "cadastro3.html";
    });
}

// ======================================================
//                    ETAPA 3 DO CADASTRO
// ======================================================
const etapa3 = document.getElementById("cadastroEtapa3");

if (etapa3) {
    etapa3.addEventListener("submit", (e) => {
        e.preventDefault();

        const tempData = JSON.parse(localStorage.getItem(TEMP_USER_KEY));

        if (!tempData) {
            alert("Erro: volte para o início.");
            window.location.href = "cadastro.html";
            return;
        }

        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;

        if (senha !== confirmar) {
            alert("As senhas não coincidem.");
            return;
        }

        tempData.senha = senha;

        localStorage.setItem(USER_KEY, JSON.stringify(tempData));
        localStorage.removeItem(TEMP_USER_KEY);

        alert("Cadastro concluído!");
        window.location.href = "login.html";
    });
}

// ======================================================
//                        LOGIN
// ======================================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeEmail = document.getElementById("loginNome").value.trim();
        const senha = document.getElementById("loginSenha").value.trim();

        const user = JSON.parse(localStorage.getItem(USER_KEY));

        if (!user) {
            alert("Nenhuma conta cadastrada.");
            return;
        }

        if ((nomeEmail === user.nome || nomeEmail === user.email) && senha === user.senha) {
            localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
            window.location.href = "home.html";
        } else {
            alert("Usuário/e-mail ou senha incorretos.");
        }
    });
}

// ======================================================
//             CARREGAR DADOS DO PERFIL
// ======================================================
function carregarDadosPerfil() {
    if (!document.getElementById("perfilNome")) return;

    const user = JSON.parse(localStorage.getItem(LOGGED_KEY));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("perfilNome").textContent = user.nome;
    document.getElementById("perfilEmail").textContent = user.email;
}

// ======================================================
//                       LOGOUT
// ======================================================
function logoutUser() {
    localStorage.removeItem(LOGGED_KEY);
    window.location.href = "login.html";
}

// ======================================================
//                MOSTRAR/OCULTAR SENHA
// ======================================================
function toggleSenha(img, id) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        img.src = "../style/icons/eye.png";
    } else {
        input.type = "password";
        img.src = "../style/icons/hidden.png";
    }
}


// ======================================================
//               Animação "Olá"
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const saudacao = document.getElementById("saudacaoPerfil");
    const btnPerfil = document.getElementById("btnPerfil");

    if (!saudacao || !btnPerfil) return;

    if (loggedUser) {
        // Define o texto da saudação
        saudacao.textContent = `Olá, ${loggedUser.nome.split(" ")[0]}!`;

        // Força o estado inicial para que a transição funcione
        saudacao.style.opacity = "0";
        saudacao.style.transform = "translateX(15px)";

        // Dispara a animação
        requestAnimationFrame(() => {
            setTimeout(() => {
                saudacao.style.opacity = "1";
                saudacao.style.transform = "translateX(0)";
            }, 50);
        });

        // Clique no perfil leva para a página de perfil
        btnPerfil.href = "perfil.html";
    } else {
        // Usuário não logado, clique leva para login
        btnPerfil.href = "login.html";
    }
});
