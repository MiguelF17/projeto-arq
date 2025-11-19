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

    // pega o usuário logado (objeto) do LOGGED_KEY
    const usuarioLogado = JSON.parse(localStorage.getItem(LOGGED_KEY));

    if (perfilBtn) {
        if (usuarioLogado) {
            perfilBtn.href = "perfil.html";
        } else {
            perfilBtn.href = "login.html";
        }
    }

    // só anima se tiver saudacao no DOM e se houver usuário logado
    if (saudacao && usuarioLogado && window.location.pathname.includes("home.html")) {
        // usa o nome do objeto salvo (usuarioLogado.nome)
        animarSaudacao(`Olá, ${usuarioLogado.nome}`);
    }

    // carregar os dados do perfil (se existir a página)
    carregarDadosPerfil();
});


// ======================================================
//                    ETAPA 1 DO CADASTRO
// ======================================================
const etapa1 = document.getElementById("cadastroEtapa1");

if (etapa1) {
    etapa1.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const cemail = document.getElementById("cemail").value;
        const telefone = document.getElementById("telefone").value;

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

        const cep = document.getElementById("cep").value;
        const numero = document.getElementById("numero").value;
        const cpf = document.getElementById("cpf").value;

        if (!cep || !numero || !cpf) {
            alert("Preencha todos os campos.");
            return;
        }

        tempData.cep = cep;
        tempData.numero = numero;
        tempData.cpf = cpf;

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

        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
    });
}



// ======================================================
//                       LOGIN
// ======================================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const senha = document.getElementById("senha").value;

        const user = JSON.parse(localStorage.getItem(USER_KEY));

        if (!user) {
            alert("Conta não encontrada.");
            return;
        }

        if ((nome === user.nome || nome === user.email) && senha === user.senha) {
            localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
            window.location.href = "home.html";
        } else {
            alert("Usuário ou senha incorretos.");
        }
    });
}



// ======================================================
//                      PERFIL
// ======================================================
function carregarDadosPerfil() {
    const container = document.getElementById("dadosUsuario");
    if (!container) return;

    const user = JSON.parse(localStorage.getItem(LOGGED_KEY));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    container.innerHTML = `
        <p><strong>Usuário:</strong> ${user.nome}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefone:</strong> ${user.telefone}</p>
        <p><strong>CPF:</strong> ${user.cpf}</p>
        <p><strong>CEP:</strong> ${user.cep}</p>
        <p><strong>Número:</strong> ${user.numero}</p>
    `;
}



// ======================================================
//                        LOGOUT
// ======================================================
function logoutUser() {
    localStorage.removeItem("loggedUser");
    sessionStorage.clear(); // caso esteja usando
    window.location.href = "login.html";
}

// =====================
// SAUDAÇÃO ANIMADA (substituir aqui)
// =====================

/**
 * Digita o texto dentro do elemento (#saudacaoPerfil) e aplica animação CSS.
 * Recebe o texto completo, escreve letra a letra e adiciona a classe que ativa a transição/slide.
 */
function animarSaudacao(texto) {
    const span = document.getElementById("saudacaoPerfil");
    if (!span) return;

    // resetar estado
    span.textContent = "";
    span.style.opacity = "1";
    span.style.transform = "translateX(20px)";

    // escreve letra a letra
    let i = 0;
    function step() {
        if (i < texto.length) {
            span.textContent += texto.charAt(i);
            i++;
            // usa requestAnimationFrame para animação mais suave
            requestAnimationFrame(step);
        } else {
            // quando terminar de digitar, aplica uma pequena animação de correção
            span.style.transition = "transform 300ms ease, opacity 300ms ease";
            span.style.transform = "translateX(0)";
            // também adiciona a classe caso você queira usar keyframes CSS (opcional)
            span.classList.add("animar-saudacao");
        }
    }

    // iniciar digitação com pequeno delay para parecer responsivo
    setTimeout(() => requestAnimationFrame(step), 80);
}



// ======================================================
//                 MÁSCARAS DE INPUT
// ======================================================

// TELEFONE
document.addEventListener("input", (e) => {
    if (e.target.id === "telefone") {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/, "($1) $2");
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = v;
    }
});

// CPF
document.addEventListener("input", (e) => {
    if (e.target.id === "cpf") {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = v;
    }
});

// CEP + VIA CEP
document.addEventListener("input", async (e) => {
    if (e.target.id === "cep") {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        e.target.value = v;

        if (v.length === 9) {
            const cepNum = v.replace("-", "");

            try {
                const res = await fetch(`https://viacep.com.br/ws/${cepNum}/json/`);
                const data = await res.json();

                if (!data.erro) {
                    document.getElementById("rua").value = data.logradouro || "";
                    document.getElementById("bairro").value = data.bairro || "";
                    document.getElementById("cidade").value = data.localidade || "";
                    document.getElementById("estado").value = data.uf || "";
                }
            } catch {
                alert("Erro ao buscar CEP.");
            }
        }
    }
});
