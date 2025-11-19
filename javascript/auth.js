// ===========================
//   BANCO TEMPORÁRIO (API)
// ===========================

const API = {
    getUsers: () => JSON.parse(localStorage.getItem("usuarios") || "[]"),

    saveUsers: (users) => localStorage.setItem("usuarios", JSON.stringify(users)),

    getUserByEmail: (email) => {
        const users = API.getUsers();
        return users.find(u => u.email === email);
    },

    createUser: (userData) => {
        const users = API.getUsers();

        // Impede emails duplicados
        if (API.getUserByEmail(userData.email)) {
            return { ok: false, message: "E-mail já cadastrado" };
        }

        userData.id = Date.now(); // cria um ID único
        users.push(userData);

        API.saveUsers(users);
        return { ok: true };
    },

    login: (email, senha) => {
        const user = API.getUserByEmail(email);
        if (!user) return { ok: false, message: "Usuário não encontrado" };
        if (user.senha !== senha) return { ok: false, message: "Senha incorreta" };
        return { ok: true, user };
    }
};



// ===========================
//   ETAPA 1 DO CADASTRO
// ===========================
if (document.getElementById("cadastroEtapa1")) {

    const etapa1Form = document.getElementById("cadastroEtapa1");

    document.getElementById("proximaEtapa").addEventListener("click", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const cemail = document.getElementById("cemail").value.trim();
        const telefone = document.getElementById("telefone").value.trim();

        if (!nome || !email || !cemail || !telefone) {
            alert("Preencha todos os campos.");
            return;
        }

        if (email !== cemail) {
            alert("Os e-mails não coincidem!");
            return;
        }

        // salvar dados da etapa 1 TEMPORARIAMENTE
        const etapa1Data = { nome, email, telefone };
        localStorage.setItem("cadastroTemp", JSON.stringify(etapa1Data));

        window.location.href = "cadastro2.html";
    });
}



// ===========================
//   ETAPA 2 DO CADASTRO
// ===========================
if (document.getElementById("cadastroEtapa2")) {

    document.getElementById("finalizarCadastro").addEventListener("click", (e) => {
        e.preventDefault();

        const etapa1 = JSON.parse(localStorage.getItem("cadastroTemp"));
        if (!etapa1) {
            alert("Erro: volte para a etapa 1.");
            return;
        }

        const cpf = document.getElementById("cpf").value.trim();
        const cep = document.getElementById("cep").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;

        if (!cpf || !cep || !senha || !confirmar) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmar) {
            alert("As senhas não coincidem!");
            return;
        }

        const newUser = {
            ...etapa1,
            cpf,
            cep,
            senha
        };

        const result = API.createUser(newUser);

        if (!result.ok) {
            alert(result.message);
            return;
        }

        // limpar temporários
        localStorage.removeItem("cadastroTemp");

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });
}

// ===========================
//   LOGIN
// ===========================
if (document.getElementById("formLogin")) {

    document.getElementById("formLogin").addEventListener("submit", (e) => {
        e.preventDefault();

        const emailOuNome = document.getElementById("nome").value.trim();
        const senha = document.getElementById("senha").value;

        const usuarios = API.getUsers();

        const user = usuarios.find(u =>
            (u.email === emailOuNome || u.nome === emailOuNome) &&
            u.senha === senha
        );

        if (!user) {
            alert("Usuário ou senha inválidos.");
            return;
        }

        // Salvar sessão
        localStorage.setItem("usuarioLogado", JSON.stringify(user));

        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    });
}

// ===========================
//   INFORMAÇÕES DA CONTA
// ===========================

// Só roda isso se existir a div "dadosUsuario" (que só existe no perfil.html)
if (document.getElementById("dadosUsuario")) {

    const user = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!user) {
        // se não tiver login, leva pro cadastro
        window.location.href = "cadastro.html";
    } else {
        // se tiver login, preenche os dados normalmente
        document.getElementById("dadosUsuario").innerHTML = `
            <p><strong>Nome:</strong> ${user.nome}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Telefone:</strong> ${user.telefone}</p>
            <p><strong>CPF:</strong> ${user.cpf}</p>
            <p><strong>CEP:</strong> ${user.cep}</p>
        `;
    }
}
