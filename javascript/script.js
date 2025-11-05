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