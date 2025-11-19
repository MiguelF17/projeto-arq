/* senha do cadastro e login */

function toggleSenha(img, inputId) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";

  // Corrigir caminho da imagem e garantir que ela mude corretamente
  if (isHidden) {
    img.src = "../style/icons/eye.png";
    img.alt = "Ocultar senha";
  } else {
    img.src = "../style/icons/hidden.png";
    img.alt = "Mostrar senha";
  }
}

/* Verificar usuário sessão */

// Verifica sessão em todas as páginas
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

// Alterar botão de perfil automaticamente
document.addEventListener("DOMContentLoaded", () => {
  const perfilBtn = document.getElementById("btnPerfil");
  const saudacao = document.getElementById("saudacaoPerfil");

  if (perfilBtn && saudacao) {
    if (usuarioLogado) {
      perfilBtn.href = "perfil.html";
      saudacao.textContent = `Olá, ${usuarioLogado.nome}`;

      // animação leve após o carregamento da página
      setTimeout(() => {
        saudacao.classList.add("saudacao-ativa");
      }, 300);
    } else {
      perfilBtn.href = "cadastro.html";
      saudacao.textContent = "";
      saudacao.classList.remove("saudacao-ativa");
    }
  }
});

// Função de logout
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "cadastro.html";
}


