// ======================================================
//             CARREGAR DADOS DO PERFIL COMPLETO
// ======================================================
function carregarDadosPerfil() {
    const user = JSON.parse(localStorage.getItem(LOGGED_KEY));
    const dadosDiv = document.getElementById("dadosUsuario");

    if (!user) {
        // Se não estiver logado, redireciona para login
        window.location.href = "login.html";
        return;
    }

    if (!dadosDiv) return;

    // Cria o HTML com as informações do usuário
    dadosDiv.innerHTML = `
        <p><strong>Nome:</strong> ${user.nome}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        ${user.telefone ? `<p><strong>Telefone:</strong> ${user.telefone}</p>` : ''}
        ${user.cpf ? `<p><strong>CPF:</strong> ${user.cpf}</p>` : ''}
        ${user.cep ? `<p><strong>CEP:</strong> ${user.cep}</p>` : ''}
        ${user.rua ? `<p><strong>Rua:</strong> ${user.rua}</p>` : ''}
        ${user.numero ? `<p><strong>Número:</strong> ${user.numero}</p>` : ''}
        ${user.bairro ? `<p><strong>Bairro:</strong> ${user.bairro}</p>` : ''}
        ${user.cidade ? `<p><strong>Cidade:</strong> ${user.cidade}</p>` : ''}
        ${user.estado ? `<p><strong>Estado:</strong> ${user.estado}</p>` : ''}
    `;
}

// Chama a função quando a página carregar
document.addEventListener("DOMContentLoaded", carregarDadosPerfil);
